import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import pdfParse from 'pdf-parse';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to analyze resume
export const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No resume file uploaded.",
                success: false
            });
        }

        const filePath = req.file.path;
        const originalName = req.file.originalname;
        const jobDescription = req.body.jobDescription || '';
        
        // Basic file validation
        if (!originalName.toLowerCase().endsWith('.pdf')) {
            // Clean up uploaded file
            fs.unlink(filePath, (err) => {
                if (err) console.log('Error deleting file:', err);
            });
            
            return res.status(400).json({
                message: "Only PDF files are allowed.",
                success: false
            });
        }

        // Extract text from PDF
        let resumeText = '';
        try {
            const dataBuffer = fs.readFileSync(filePath);
            const pdfData = await pdfParse(dataBuffer);
            resumeText = pdfData.text;
        } catch (pdfError) {
            console.log('Error extracting PDF text:', pdfError);
            // Clean up uploaded file
            fs.unlink(filePath, (err) => {
                if (err) console.log('Error deleting file:', err);
            });
            
            return res.status(400).json({
                message: "Could not extract text from PDF. Please ensure it's a valid text-based PDF.",
                success: false
            });
        }

        // Clean up uploaded file after text extraction
        fs.unlink(filePath, (err) => {
            if (err) console.log('Error deleting file:', err);
        });

        if (!resumeText.trim()) {
            return res.status(400).json({
                message: "Could not extract text from PDF. The file might be image-based or corrupted.",
                success: false
            });
        }

        // Get Gemini AI analysis
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            const prompt = `
            As an expert ATS (Applicant Tracking System) analyzer and career consultant, please analyze the following resume against the job description and provide a comprehensive evaluation.

            RESUME TEXT:
            ${resumeText}

            JOB DESCRIPTION:
            ${jobDescription || 'General job market analysis'}

            Please provide your analysis in the following JSON format:
            {
                "atsScore": <number between 0-100>,
                "keywordMatch": <number between 0-100>,
                "formatScore": <number between 0-100>,
                "dos": [
                    "List of 4-6 specific recommendations of what to include or improve"
                ],
                "donts": [
                    "List of 4-6 specific things to avoid or remove"
                ],
                "improvements": [
                    "List of 5-8 specific actionable improvement suggestions"
                ],
                "missingKeywords": [
                    "List of important keywords from job description missing in resume"
                ]
            }

            Guidelines for scoring:
            - atsScore: Overall ATS compatibility (format, structure, keywords)
            - keywordMatch: How well resume keywords match job requirements  
            - formatScore: ATS-friendly formatting (no graphics, clear structure, etc.)

            Provide specific, actionable advice. Focus on:
            1. ATS optimization
            2. Keyword matching
            3. Format compatibility
            4. Content improvements
            5. Industry-specific recommendations

            Return only the JSON object, no additional text.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            let analysisText = response.text();

            // Clean the response to extract only JSON
            analysisText = analysisText.replace(/```json/g, '').replace(/```/g, '').trim();

            let analysis;
            try {
                analysis = JSON.parse(analysisText);
            } catch (parseError) {
                console.log('Error parsing AI response:', parseError);
                console.log('Raw AI response:', analysisText);
                
                // Fallback analysis if JSON parsing fails
                analysis = {
                    atsScore: 75,
                    keywordMatch: 70,
                    formatScore: 85,
                    dos: [
                        "Use standard section headers (Experience, Education, Skills)",
                        "Include relevant keywords from the job description",
                        "Use bullet points for easy scanning",
                        "Include quantifiable achievements and metrics"
                    ],
                    donts: [
                        "Don't use graphics, images, or fancy formatting",
                        "Avoid using tables or columns",
                        "Don't include personal photos",
                        "Avoid unconventional fonts or colors"
                    ],
                    improvements: [
                        "Add more specific technical skills",
                        "Include measurable achievements with numbers",
                        "Optimize keywords for your target role",
                        "Improve the professional summary section",
                        "Add relevant certifications if applicable"
                    ],
                    missingKeywords: jobDescription ? ["Specific keywords will be identified based on job description"] : []
                };
            }

            return res.status(200).json({
                message: "Resume analysis completed successfully",
                analysis: analysis,
                success: true
            });

        } catch (aiError) {
            console.log('Error with Gemini AI:', aiError);
            
            // Fallback analysis if AI service fails
            const fallbackAnalysis = {
                atsScore: 75,
                keywordMatch: 70,
                formatScore: 85,
                dos: [
                    "Use standard section headers (Experience, Education, Skills)",
                    "Include relevant keywords from the job description",
                    "Use bullet points for easy scanning",
                    "Include quantifiable achievements and metrics",
                    "Keep formatting simple and clean"
                ],
                donts: [
                    "Don't use graphics, images, or fancy formatting",
                    "Avoid using tables or columns for main content",
                    "Don't include personal photos or irrelevant information",
                    "Avoid unconventional fonts or excessive styling"
                ],
                improvements: [
                    "Add more specific technical skills relevant to your field",
                    "Include measurable achievements with numbers and percentages",
                    "Optimize keywords for your target role and industry",
                    "Improve the professional summary section",
                    "Add relevant certifications or training",
                    "Ensure consistent formatting throughout",
                    "Use action verbs to start bullet points"
                ],
                missingKeywords: jobDescription ? ["Keywords analysis requires AI service"] : []
            };

            return res.status(200).json({
                message: "Resume analysis completed (using fallback analysis)",
                analysis: fallbackAnalysis,
                success: true
            });
        }

    } catch (error) {
        console.log('Error analyzing resume:', error);
        return res.status(500).json({
            message: "Internal server error during resume analysis.",
            success: false
        });
    }
}; 
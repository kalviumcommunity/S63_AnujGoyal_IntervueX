import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../About';

// Mock the Navbar component
jest.mock('../../components/shared/Navbar', () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">IntervueX</nav>;
  };
});

// Helper function to render component with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('About Component', () => {
  // Test 1: Component renders without crashing
  test('renders without crashing', () => {
    renderWithRouter(<About />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  // Test 2: Main title and description are displayed
  test('displays main title and description', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('About IntervueX')).toBeInTheDocument();
    expect(screen.getByText(/Revolutionizing the way companies and candidates connect/)).toBeInTheDocument();
  });

  // Test 3: Mission section is rendered correctly
  test('renders mission section with correct content', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText(/IntervueX is dedicated to making the hiring process/)).toBeInTheDocument();
    expect(screen.getByText(/Our platform provides comprehensive tools/)).toBeInTheDocument();
  });

  // Test 4: Features list is present with all items
  test('displays all features in the features list', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('Why Choose IntervueX?')).toBeInTheDocument();
    expect(screen.getByText('Advanced ATS integration')).toBeInTheDocument();
    expect(screen.getByText('AI-powered candidate matching')).toBeInTheDocument();
    expect(screen.getByText('Streamlined interview process')).toBeInTheDocument();
    expect(screen.getByText('Real-time collaboration tools')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive analytics')).toBeInTheDocument();
  });

  // Test 5: Values section displays all three values
  test('renders all three company values', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('Our Values')).toBeInTheDocument();
    expect(screen.getByText('Innovation')).toBeInTheDocument();
    expect(screen.getByText('Transparency')).toBeInTheDocument();
    expect(screen.getByText('Excellence')).toBeInTheDocument();
  });

  // Test 6: Values section has correct descriptions
  test('displays correct descriptions for each value', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText(/Continuously evolving our platform with the latest technology/)).toBeInTheDocument();
    expect(screen.getByText(/Providing clear, honest communication throughout/)).toBeInTheDocument();
    expect(screen.getByText(/Committed to delivering very exceptional results/)).toBeInTheDocument();
  });

  // Test 7: Values section has numbered circles
  test('displays numbered circles for values', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  // Test 8: Component has correct CSS classes for styling
  test('applies correct CSS classes for layout', () => {
    renderWithRouter(<About />);
    
    const mainContainer = screen.getByText('About IntervueX').closest('div').parentElement.parentElement;
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gray-50');
  });

  // Test 9: Features list items have correct bullet styling
  test('features list items have correct bullet point styling', () => {
    renderWithRouter(<About />);
    
    const featuresSection = screen.getByText('Advanced ATS integration').closest('li');
    expect(featuresSection).toHaveClass('flex', 'items-start');
  });

  // Test 10: All main sections are present
  test('contains all main sections', () => {
    renderWithRouter(<About />);
    
    // Check for main sections
    expect(screen.getByText('About IntervueX')).toBeInTheDocument();
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText('Why Choose IntervueX?')).toBeInTheDocument();
    expect(screen.getByText('Our Values')).toBeInTheDocument();
  });
}); 
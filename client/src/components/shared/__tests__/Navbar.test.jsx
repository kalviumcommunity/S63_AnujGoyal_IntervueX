import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

// Helper function to render component with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  // Test 1: Component renders without crashing
  test('renders without crashing', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText('Intervue')).toBeInTheDocument();
  });

  // Test 2: Brand logo is displayed correctly
  test('displays brand logo with correct styling', () => {
    renderWithRouter(<Navbar />);
    
    const brandText = screen.getByText('Intervue');
    const brandX = screen.getByText('X');
    expect(brandText).toBeInTheDocument();
    expect(brandX).toBeInTheDocument();
    expect(brandX).toHaveClass('text-[#F83002]');
  });

  // Test 3: Navigation links are present
  test('displays all navigation links', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getAllByText('Home')).toHaveLength(2); // Desktop and mobile
    expect(screen.getAllByText('Contact')).toHaveLength(2);
    expect(screen.getAllByText('About')).toHaveLength(2);
    expect(screen.getAllByText('Jobs')).toHaveLength(2);
  });

  // Test 4: Auth buttons are present
  test('displays login and signup buttons', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getAllByText('Login')).toHaveLength(2); // Desktop and mobile
    expect(screen.getAllByText('Signup')).toHaveLength(2);
  });

  // Test 5: Mobile menu button is present
  test('displays mobile menu button', () => {
    renderWithRouter(<Navbar />);
    
    const mobileMenuButton = screen.getByRole('button');
    expect(mobileMenuButton).toBeInTheDocument();
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
  });
}); 
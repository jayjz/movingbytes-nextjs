import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header Component', () => {
  it('should render the logo and key action buttons', () => {
    // Render the component with dummy functions for the props
    render(<Header onViewToggle={() => {}} onResumeDownload={() => {}} />);

    // Check if the logo text "MovingBytes" is on the page
    expect(screen.getByText(/MovingBytes/i)).toBeInTheDocument();

    // Check if the "Terminal" button is rendered
    expect(screen.getByRole('button', { name: /Terminal/i })).toBeInTheDocument();

    // Check if the "Resume" button is rendered
    expect(screen.getByRole('button', { name: /Resume/i })).toBeInTheDocument();
  });
});
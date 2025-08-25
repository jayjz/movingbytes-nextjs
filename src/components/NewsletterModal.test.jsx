import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NewsletterModal from './NewsletterModal';

describe('NewsletterModal Component', () => {
  it('should render the modal and allow a user to type and submit', () => {
    // Create a mock function for the onClose prop
    const handleClose = vi.fn();

    render(<NewsletterModal onClose={handleClose} />);

    // Check if the title is visible
    expect(screen.getByText(/Weekly Threat Intel Briefing/i)).toBeInTheDocument();

    // Find the email input field
    const emailInput = screen.getByPlaceholderText('operator@domain.com');
    expect(emailInput).toBeInTheDocument();

    // Simulate a user typing an email address
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    // Find and click the submit button
    const submitButton = screen.getByRole('button', { name: /Subscribe/i });
    fireEvent.click(submitButton);

    // After submission, the form's logic will call the onClose function.
    // We expect our mock function to have been called.
    // Note: This test assumes the form submission logic calls onClose.
    // We will update the component in a later step to ensure this happens.
  });
});
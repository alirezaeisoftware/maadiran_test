import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './navbar';

describe('Navbar component', () => {
  const setup = (level = 0) => {
    const onToggleTheme = vi.fn();
    const onRestartConfirmed = vi.fn();

    render(
      <Navbar
        level={level}
        onToggleTheme={onToggleTheme}
        isDarkMode={false}
        onRestartConfirmed={onRestartConfirmed}
      />
    );

    return { onToggleTheme, onRestartConfirmed };
  };

  it('renders current level correctly', () => {
    setup(2);
    expect(screen.getByTestId('level-display').textContent).toBe('Level 3');
  });

  it('calls onToggleTheme when theme button is clicked', () => {
    const { onToggleTheme } = setup();
    const toggleBtn = screen.getByTestId('theme-toggle-button');
    fireEvent.click(toggleBtn);
    expect(onToggleTheme).toHaveBeenCalled();
  });

  it('does not show "Start Again" button if level is 0', () => {
    setup(0);
    expect(screen.queryByTestId('restart-button')).toBeNull();
  });

  it('shows "Start Again" button if level is greater than 0', () => {
    setup(1);
    expect(screen.getByTestId('restart-button')).toBeInTheDocument();
  });

  it('opens confirmation modal when "Start Again" is clicked', () => {
    setup(1);
    fireEvent.click(screen.getByTestId('restart-button'));
    expect(
      screen.getByText(/Are you sure you want to restart/i)
    ).toBeInTheDocument();
  });

  it('calls onRestartConfirmed when user confirms restart', () => {
    const { onRestartConfirmed } = setup(1);
    fireEvent.click(screen.getByTestId('restart-button'));

    const confirmButton = screen.getByText(/Yes|Confirm/i);
    fireEvent.click(confirmButton);

    expect(onRestartConfirmed).toHaveBeenCalled();
  });

  it('closes modal when user cancels restart', () => {
    setup(1);
    fireEvent.click(screen.getByTestId('restart-button'));

    const cancelButton = screen.getByText(/No|Cancel/i);
    fireEvent.click(cancelButton);

    expect(
      screen.queryByText(/Are you sure you want to restart/i)
    ).not.toBeInTheDocument();
  });
});

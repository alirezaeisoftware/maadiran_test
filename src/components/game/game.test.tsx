import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Game from './game';

vi.mock('./gameUi/gameUi', () => ({
  default: vi.fn(() => <div data-testid="game-ui">Game UI</div>),
}));

vi.mock('../../hooks/gameLogics/useGameLogics', () => ({
  useGameLogic: () => ({
    level: 1,
    rows: 4,
    cols: 3,
    baseColor: 'hsl(210, 70%, 50%)',
    diffColor: 'hsl(210, 70%, 60%)',
    diffIndex: 5,
    showModal: false,
    showWrongModal: false,
    isGameFinished: false,
    handleClick: vi.fn(),
    handleNextLevel: vi.fn(),
    handleRepeatLevel: vi.fn(),
    handleRestart: vi.fn(),
    resetGame: vi.fn(),
    closeWrongModal: vi.fn(),
  }),
}));

describe('Game component', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key) => (key === 'theme' ? 'light' : null)),
      setItem: vi.fn(),
    });
  });

  it('renders loading spinner initially', async () => {
    render(<Game />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders GameUI after loading', async () => {
    render(<Game />);
    await waitFor(() => {
      expect(screen.getByTestId('game-ui')).toBeInTheDocument();
    });
  });

  it('toggles theme when called', async () => {
    render(<Game />);
    await waitFor(() => screen.getByTestId('game-ui'));

    const root = document.documentElement;
    expect(root.classList.contains('dark')).toBe(false);

    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');

    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });
});

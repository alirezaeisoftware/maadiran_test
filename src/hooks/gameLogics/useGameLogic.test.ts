import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useGameLogic } from './useGameLogics'

beforeEach(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  });
});

describe('useGameLogic', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useGameLogic());

    expect(result.current.level).toBe(0);
    expect(result.current.rows).toBeGreaterThan(0);
    expect(result.current.cols).toBeGreaterThan(0);
    expect(result.current.baseColor).toBeTruthy();
    expect(result.current.diffColor).toBeTruthy();
    expect(result.current.diffIndex).toBeGreaterThanOrEqual(0);
  });

  it('should go to next level on handleNextLevel', () => {
    const { result } = renderHook(() => useGameLogic());

    const initialLevel = result.current.level;

    act(() => {
      result.current.handleNextLevel();
    });

    expect(result.current.level).toBe(initialLevel + 1);
    expect(localStorage.removeItem).toHaveBeenCalledWith('diff-color');
    expect(localStorage.removeItem).toHaveBeenCalledWith('diff-index');
  });

  it('should reset level and state on handleRestart', () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleRestart();
    });

    expect(result.current.level).toBe(0);
    expect(result.current.diffColor).toBe('');
    expect(result.current.diffIndex).toBe(0);
    expect(result.current.isGameFinished).toBe(false);
    expect(result.current.showModal).toBe(false);
    expect(localStorage.removeItem).toHaveBeenCalledWith('game-level');
  });

  it('should show modal on correct click', () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleClick(result.current.diffIndex);
    });

    expect(result.current.showModal).toBe(true);
  });

  it('should show wrong modal on incorrect click', () => {
    const { result } = renderHook(() => useGameLogic());

    const wrongIndex = result.current.diffIndex + 1;

    act(() => {
      result.current.handleClick(wrongIndex);
    });

    expect(result.current.showWrongModal).toBe(true);
  });

  it('should close wrong modal', () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleClick(result.current.diffIndex + 1);
    });

    act(() => {
      result.current.closeWrongModal();
    });

    expect(result.current.showWrongModal).toBe(false);
  });
});

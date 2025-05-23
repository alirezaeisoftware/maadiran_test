import { renderHook, act } from '@testing-library/react';
import { useGameLogic } from './useGameLogics';
import { vi } from 'vitest';

describe('useGameLogic', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useGameLogic());

    expect(result.current.level).toBe(0);
    expect(result.current.diffIndex).toBeDefined();
    expect(typeof result.current.diffColor).toBe('string');
    expect(result.current.showModal).toBe(false);
  });

  it('should go to next level on handleNextLevel', () => {
    const removeItemSpy = vi.spyOn(window.localStorage.__proto__, 'removeItem');
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleNextLevel();
    });

    expect(result.current.level).toBe(1);
    expect(result.current.showModal).toBe(false);
    expect(removeItemSpy).not.toHaveBeenCalled();
  });

  it('should reset level and state on handleRestart', () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleNextLevel();
      result.current.handleRestart();
    });

    expect(result.current.level).toBe(0);
    expect(result.current.diffIndex).toBe(0);
    expect(result.current.isGameFinished).toBe(false);
    expect(result.current.showModal).toBe(false);
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
      result.current.closeWrongModal();
    });

    expect(result.current.showWrongModal).toBe(false);
  });

  it('should open and close success modal', () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.openSuccessModal();
    });

    expect(result.current.showModal).toBe(true);

    act(() => {
      result.current.closeSuccessModal();
    });

    expect(result.current.showModal).toBe(false);
  });
});

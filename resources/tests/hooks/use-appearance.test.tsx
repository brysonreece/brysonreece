import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initializeTheme, useAppearance } from '@/hooks/use-appearance';

describe('useAppearance', () => {
    let matchMediaMock: {
        matches: boolean;
        addEventListener: ReturnType<typeof vi.fn>;
        removeEventListener: ReturnType<typeof vi.fn>;
    };

    beforeEach(() => {
        // Clear localStorage
        localStorage.clear();

        // Mock document.cookie
        Object.defineProperty(document, 'cookie', {
            writable: true,
            value: '',
        });

        // Mock matchMedia
        matchMediaMock = {
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        };

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(() => matchMediaMock),
        });

        // Clear dark class
        document.documentElement.classList.remove('dark');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('initializes with system appearance by default', () => {
        const { result } = renderHook(() => useAppearance());
        expect(result.current.appearance).toBe('system');
    });

    it('loads saved appearance from localStorage', () => {
        localStorage.setItem('appearance', 'dark');

        const { result } = renderHook(() => useAppearance());
        expect(result.current.appearance).toBe('dark');
    });

    it('updates appearance when changed', () => {
        const { result } = renderHook(() => useAppearance());

        act(() => {
            result.current.updateAppearance('dark');
        });

        expect(result.current.appearance).toBe('dark');
    });

    it('stores appearance in localStorage', () => {
        const { result } = renderHook(() => useAppearance());

        act(() => {
            result.current.updateAppearance('light');
        });

        expect(localStorage.getItem('appearance')).toBe('light');
    });

    it('applies dark class for dark mode', () => {
        const { result } = renderHook(() => useAppearance());

        act(() => {
            result.current.updateAppearance('dark');
        });

        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('removes dark class for light mode', () => {
        document.documentElement.classList.add('dark');

        const { result } = renderHook(() => useAppearance());

        act(() => {
            result.current.updateAppearance('light');
        });

        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('applies dark class for system mode when prefers dark', () => {
        matchMediaMock.matches = true;

        const { result } = renderHook(() => useAppearance());

        act(() => {
            result.current.updateAppearance('system');
        });

        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('removes dark class for system mode when prefers light', () => {
        matchMediaMock.matches = false;

        const { result } = renderHook(() => useAppearance());

        act(() => {
            result.current.updateAppearance('system');
        });

        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('cleans up event listener on unmount', () => {
        const { unmount } = renderHook(() => useAppearance());

        unmount();

        expect(matchMediaMock.removeEventListener).toHaveBeenCalled();
    });
});

describe('initializeTheme', () => {
    let matchMediaMock: {
        matches: boolean;
        addEventListener: ReturnType<typeof vi.fn>;
        removeEventListener: ReturnType<typeof vi.fn>;
    };

    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove('dark');

        matchMediaMock = {
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        };

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(() => matchMediaMock),
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('applies system theme by default', () => {
        initializeTheme();
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('applies saved dark theme', () => {
        localStorage.setItem('appearance', 'dark');
        initializeTheme();
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('applies saved light theme', () => {
        localStorage.setItem('appearance', 'light');
        initializeTheme();
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('registers system theme change listener', () => {
        initializeTheme();
        expect(matchMediaMock.addEventListener).toHaveBeenCalledWith(
            'change',
            expect.any(Function),
        );
    });
});

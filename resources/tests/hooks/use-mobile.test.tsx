import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useIsMobile } from '@/hooks/use-mobile';

describe('useIsMobile', () => {
    let matchMediaMock: {
        matches: boolean;
        addEventListener: ReturnType<typeof vi.fn>;
        removeEventListener: ReturnType<typeof vi.fn>;
    };

    beforeEach(() => {
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

    it('returns false for desktop viewport', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1024,
        });

        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);
    });

    it('returns true for mobile viewport', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 375,
        });

        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
    });

    it('returns true at 767px breakpoint', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 767,
        });

        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
    });

    it('returns false at 768px breakpoint', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 768,
        });

        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);
    });

    it('updates when viewport changes', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1024,
        });

        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);

        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                value: 375,
            });
            const changeHandler = matchMediaMock.addEventListener.mock.calls[0][1];
            changeHandler();
        });

        expect(result.current).toBe(true);
    });

    it('cleans up event listener on unmount', () => {
        const { unmount } = renderHook(() => useIsMobile());

        expect(matchMediaMock.addEventListener).toHaveBeenCalledWith(
            'change',
            expect.any(Function),
        );

        unmount();

        expect(matchMediaMock.removeEventListener).toHaveBeenCalledWith(
            'change',
            expect.any(Function),
        );
    });
});

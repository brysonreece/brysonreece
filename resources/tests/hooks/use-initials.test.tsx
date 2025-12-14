import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useInitials } from '@/hooks/use-initials';

describe('useInitials', () => {
    it('returns empty string for empty name', () => {
        const { result } = renderHook(() => useInitials());
        expect(result.current('')).toBe('');
    });

    it('returns single uppercase initial for single name', () => {
        const { result } = renderHook(() => useInitials());
        expect(result.current('John')).toBe('J');
    });

    it('returns first and last initials for full name', () => {
        const { result } = renderHook(() => useInitials());
        expect(result.current('John Doe')).toBe('JD');
    });

    it('returns first and last initials for name with middle names', () => {
        const { result } = renderHook(() => useInitials());
        expect(result.current('John Michael Doe')).toBe('JD');
    });

    it('converts lowercase names to uppercase initials', () => {
        const { result } = renderHook(() => useInitials());
        expect(result.current('john doe')).toBe('JD');
    });

    it('handles names with extra whitespace', () => {
        const { result } = renderHook(() => useInitials());
        expect(result.current('  John   Doe  ')).toBe('JD');
    });

    it('handles single character names', () => {
        const { result } = renderHook(() => useInitials());
        expect(result.current('A')).toBe('A');
        expect(result.current('A B')).toBe('AB');
    });
});

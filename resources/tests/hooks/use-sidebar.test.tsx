import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ReactNode } from 'react';
import { SidebarContext, useSidebar } from '@/hooks/use-sidebar';

describe('useSidebar', () => {
    it('throws error when used outside SidebarProvider', () => {
        expect(() => {
            renderHook(() => useSidebar());
        }).toThrow('useSidebar must be used within a SidebarProvider.');
    });

    it('returns sidebar context when used within provider', () => {
        const mockContext = {
            state: 'expanded' as const,
            open: true,
            setOpen: () => {},
            openMobile: false,
            setOpenMobile: () => {},
            isMobile: false,
            toggleSidebar: () => {},
        };

        const wrapper = ({ children }: { children: ReactNode }) => (
            <SidebarContext.Provider value={mockContext}>{children}</SidebarContext.Provider>
        );

        const { result } = renderHook(() => useSidebar(), { wrapper });

        expect(result.current).toEqual(mockContext);
    });

    it('provides all required context properties', () => {
        const mockContext = {
            state: 'collapsed' as const,
            open: false,
            setOpen: () => {},
            openMobile: true,
            setOpenMobile: () => {},
            isMobile: true,
            toggleSidebar: () => {},
        };

        const wrapper = ({ children }: { children: ReactNode }) => (
            <SidebarContext.Provider value={mockContext}>{children}</SidebarContext.Provider>
        );

        const { result } = renderHook(() => useSidebar(), { wrapper });

        expect(result.current.state).toBe('collapsed');
        expect(result.current.open).toBe(false);
        expect(result.current.openMobile).toBe(true);
        expect(result.current.isMobile).toBe(true);
        expect(typeof result.current.setOpen).toBe('function');
        expect(typeof result.current.setOpenMobile).toBe('function');
        expect(typeof result.current.toggleSidebar).toBe('function');
    });
});

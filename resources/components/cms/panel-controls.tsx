import { cn } from "@/lib/utils";
import { Orientation } from "@/types";
import { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";

type PanelControlsProps = HTMLAttributes<HTMLDivElement> & {
    actions: (orientation: Orientation) => ReactNode;
    orientation: Orientation;
}

export function PanelControls({ actions, orientation, className, ...props }: PanelControlsProps) {
    return (
        <div className={cn('flex items-center divide-sidebar-border border-b', {
            'flex-row divide-x': orientation === 'horizontal',
            'flex-col divide-y': orientation === 'vertical',
        }, className)} {...props}>
            {actions(orientation)}
        </div>
    );
}

type PanelButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'>;

export function PanelButton({ children, className, ...props }: PanelButtonProps) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn('shrink-0 size-8 rounded-none', className)}
            {...props}
        >
            {children}
        </Button>
    );
}

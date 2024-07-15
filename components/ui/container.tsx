import { ElementType, HTMLAttributes } from "react";

import { cn } from "@/lib/util";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    as?: ElementType;
}

export function Container({ as: Component = "div", className, ...props }: ContainerProps) {
    return (
        <Component className={cn("mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl", className)} {...props} />
    )
}

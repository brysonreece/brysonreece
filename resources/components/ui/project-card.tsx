import { ReactNode, useState } from 'react';
import { Property as CSSProperty } from 'csstype';

import { Card, CardContent } from './card';

import { cn } from '@/lib/utils';

export type Project = {
    year: string;
    title: string;
    description: ReactNode;
    coverImage: CSSProperty.BackgroundImage;
};

export function ProjectCard({ project }: { project: Project }) {
    const { year, title, description, coverImage } = project;
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = () => setIsFlipped(!isFlipped);

    return (
        <li className="aspect-square w-full perspective-1000">
            <div
                onClick={toggleFlip}
                className={cn(
                    "relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer",
                    isFlipped && "rotate-y-180"
                )}
            >
                {/* The front side of the card with the cover image and title */}
                <Card className={cn(
                    "absolute inset-0 w-full h-full backface-hidden py-0",
                    "hover:shadow-md transition-shadow"
                )} style={{
                    backgroundImage: coverImage,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <CardContent className="relative h-full w-full px-0">
                        {/* Overlay for the cover image */}
                        <div className="absolute rounded-lg inset-0 bg-black/75" />
                        <div className="absolute top-4 left-4 max-w-3/4">
                            <p className="text-xl font-bold text-primary truncate">{year}</p>
                        </div>
                        <div className="absolute bottom-4 right-4 max-w-3/4 text-right">
                            <dt className="text-2xl font-bold text-primary">{title}</dt>
                        </div>
                    </CardContent>
                </Card>

                {/* The back side of the card with the extended description */}
                <Card className={cn(
                    "absolute inset-0 w-full h-full backface-hidden rotate-y-180",
                    "hover:shadow-md transition-shadow py-0"
                )}>
                    <CardContent className="relative h-full w-full overflow-x-clip overflow-y-auto py-4">
                        <dd>{description}</dd>
                    </CardContent>
                </Card>
            </div>
        </li>
    );
}

import { Property as CSSProperty } from 'csstype';
import { ReactNode, useState } from 'react';

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
        <li className="perspective-1000 aspect-square w-full">
            <div
                onClick={toggleFlip}
                className={cn(
                    'transform-style-preserve-3d relative h-full w-full cursor-pointer transition-transform duration-700',
                    isFlipped && 'rotate-y-180',
                )}
            >
                {/* The front side of the card with the cover image and title */}
                <Card
                    className={cn('absolute inset-0 h-full w-full py-0 backface-hidden', 'transition-shadow hover:shadow-md')}
                    style={{
                        backgroundImage: coverImage,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <CardContent className="relative h-full w-full px-0">
                        {/* Overlay for the cover image */}
                        <div className="absolute inset-0 rounded-lg bg-black/75" />
                        <div className="absolute top-4 left-4 max-w-3/4">
                            <p className="text-primary truncate text-xl font-bold">{year}</p>
                        </div>
                        <div className="absolute right-4 bottom-4 max-w-3/4 text-right">
                            <dt className="text-primary text-2xl font-bold">{title}</dt>
                        </div>
                    </CardContent>
                </Card>

                {/* The back side of the card with the extended description */}
                <Card className={cn('absolute inset-0 h-full w-full rotate-y-180 backface-hidden', 'py-0 transition-shadow hover:shadow-md')}>
                    <CardContent className="relative h-full w-full overflow-x-clip overflow-y-auto py-4">
                        <dd>{description}</dd>
                    </CardContent>
                </Card>
            </div>
        </li>
    );
}

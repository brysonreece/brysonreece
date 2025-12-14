import { usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { LinkIcon } from 'lucide-react';

import { GitHubIcon, XIcon } from '@/components/icons';
import { Container } from '@/components/ui/container';

export function GuestFooter() {
    const { component } = usePage();

    return (
        <footer className="w-full">
            <Container>
                <div
                    className={clsx('flex flex-col items-center justify-center py-10 sm:flex-row-reverse', {
                        'sm:justify-between': component !== 'guest/welcome',
                    })}
                >
                    <div className="flex space-x-6">
                        <a href="https://x.com/brysonio" target="_blank" rel="noopener noreferrer" className="group">
                            <span className="sr-only">X</span>
                            <XIcon className="h-6 w-6 fill-stone-500 group-hover:fill-stone-700" />
                        </a>
                        <a href="https://github.com/brysonreece" target="_blank" rel="noopener noreferrer" className="group">
                            <span className="sr-only">GitHub</span>
                            <GitHubIcon className="h-6 w-6 fill-stone-500 group-hover:fill-stone-700" />
                        </a>
                        <a href="https://links.bryson.cc" target="_blank" rel="noopener noreferrer" className="group">
                            <span className="sr-only">Other Links</span>
                            <LinkIcon className="h-6 w-6 text-stone-500 group-hover:text-stone-700" />
                        </a>
                    </div>
                    {component !== 'guest/welcome' && (
                        <p className="mt-6 text-sm text-stone-500 sm:mt-0">Bryson Reece &copy; 2015 - {new Date().getFullYear()}</p>
                    )}
                </div>
            </Container>
        </footer>
    );
}

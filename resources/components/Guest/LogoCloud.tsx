import React from 'react';

export function LogoCloud() {
    return (
        <div className="mt-36 lg:mt-44">
            <p className="font-display text-base text-stone-900">
                Trusted by these six companies so far, <a href="#" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">become the next</a>
            </p>
            <ul className="mt-8 flex items-center justify-center space-x-8 sm:flex-col sm:space-x-0 sm:space-y-10 xl:flex-row xl:space-y-0 xl:space-x-12">
                <li>
                    <ul className="flex flex-col items-center space-y-8 sm:flex-row sm:space-y-0 sm:space-x-12">
                        <li className="flex">
                            <img src={logoWellcaddie} className="h-12" alt="WellCaddie" />
                        </li>
                        <li className="flex">
                            <img src={logoWunderite} className="h-12" alt="Wunderite" />
                        </li>
                        <li className="flex">
                            <img src={logoWhytespyder} className="h-12" alt="Whytespyder" />
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className="flex flex-col items-center space-y-8 sm:flex-row sm:space-y-0 sm:space-x-12">
                        <li className="flex">
                            <img src={logoMirage} className="h-12" alt="Mirage" />
                        </li>
                        <li className="flex">
                            <img src={logoLaravel} className="h-12" alt="Laravel" />
                        </li>
                        <li className="flex">
                            <img src={logoStatamic} className="h-12" alt="Statamic" />
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

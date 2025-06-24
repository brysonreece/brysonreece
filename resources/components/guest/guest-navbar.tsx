import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import clsx from 'clsx';
import { MenuIcon, XIcon } from 'lucide-react';

const navigation = [
    { name: 'About', route: 'guest.about' },
    { name: 'Career', route: 'guest.career' },
    { name: 'Projects', route: 'guest.projects' },
    { name: 'Community', route: 'guest.community' },
    { name: 'Uses', route: 'guest.uses' },
];

interface GuestNavbarProps {
    showLogo?: boolean;
}

export function GuestNavbar({ showLogo = true }: GuestNavbarProps) {
    return (
        <Disclosure as="nav" className="mx-auto w-full max-w-5xl p-2 sm:p-6 lg:p-8">
            {({ open }) => (
                <div className="flex items-center sm:justify-between">
                    {showLogo && (
                        <Link href={route('guest.welcome')} className="m-2 hidden items-center rounded-full sm:flex">
                            <img className="h-10 w-10 rounded-full" src="https://avatars.githubusercontent.com/u/4043157?v=4" alt="Bryson Reece" />
                        </Link>
                    )}

                    <div
                        className={clsx(
                            'w-full sm:w-auto',
                            'rounded-lg sm:rounded-xl',
                            'bg-stone-100 sm:hover:bg-stone-200/25 dark:bg-stone-900 sm:dark:hover:bg-stone-950/10',
                            'sm:hover:shadow-lg shadow-stone-300 dark:shadow-stone-950',
                            'sm:hover:ring sm:hover:ring-stone-300 dark:sm:hover:ring-stone-950/10',
                            'group transition-[box-shadow,background-color] duration-0 ease-in-out sm:duration-500',
                            { 'sm:mx-auto': !showLogo },
                        )}
                    >
                        <div className="sm:justify-auto flex items-center justify-between">
                            {showLogo && (
                                <Link href={route('guest.welcome')} className="mx-4 my-2 flex items-center rounded-full sm:hidden">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://avatars.githubusercontent.com/u/4043157?v=4"
                                        alt="Bryson Reece"
                                    />
                                </Link>
                            )}

                            <DisclosureButton className="relative ml-auto inline-flex items-center justify-center rounded-md p-4 text-stone-400 -outline-offset-4 hover:text-stone-500 sm:hidden dark:text-stone-500 dark:hover:text-stone-400">
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </DisclosureButton>

                            <div className="hidden sm:flex sm:space-x-4 sm:p-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={route(item.route)}
                                        className={clsx(
                                            route().current(item.route)
                                                ? 'text-stone-700 dark:text-stone-200'
                                                : 'text-stone-400 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300',
                                            'transition-colors duration-0 ease-in-out sm:duration-500',
                                            'inline-block rounded-lg px-3 py-2 text-sm font-medium active:text-stone-900 dark:active:text-stone-400',
                                        )}
                                        aria-current={route().current(item.route) ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <DisclosurePanel className="block p-2 sm:hidden">
                            <div className="flex flex-col items-end space-y-2 text-right">
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as={Link}
                                        href={route(item.route)}
                                        className={clsx(
                                            // light - plain, hover, active
                                            // text: 500, 700, 900
                                            // decoration: n/a, 400, 500
                                            // dark - plain, hover, active
                                            // text: 500, 400, 300
                                            // decoration: n/a, 700, 500
                                            route().current(item.route)
                                                ? [
                                                      'text-stone-900 decoration-stone-500',
                                                      'dark:text-stone-300 dark:decoration-stone-500',
                                                      'underline decoration-2 underline-offset-8',
                                                  ]
                                                : [
                                                      'text-stone-500',
                                                      'hover:text-stone-700 hover:decoration-stone-400',
                                                      'dark:hover:text-stone-400 dark:hover:decoration-stone-700',
                                                      'hover:underline hover:decoration-2 hover:underline-offset-8',
                                                  ],
                                            [
                                                'active:text-stone-900 active:decoration-stone-500',
                                                'dark:active:text-stone-300 dark:active:decoration-stone-500',
                                                'dark:active:underline dark:active:decoration-2 dark:active:underline-offset-8',
                                                'block w-1/3 rounded-lg px-3 py-2 text-sm font-medium',
                                            ],
                                        )}
                                        aria-current={route().current(item.route) ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </DisclosurePanel>
                    </div>
                </div>
            )}
        </Disclosure>
    );
}

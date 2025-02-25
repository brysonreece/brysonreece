import { PropsWithChildren } from 'react';
import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import { Link } from '@inertiajs/react';
import { MenuIcon, XIcon } from 'lucide-react';

const navigation = [
    { name: 'About', route: 'about' },
    { name: 'Career', route: 'career' },
    { name: 'Projects', route: 'projects' },
    { name: 'Community', route: 'community' },
    { name: 'Uses', route: 'uses' },
]

interface Props {
  showLogo?: boolean;
}

export function Navbar({ showLogo = true }: PropsWithChildren<Props>) {
    return (
        <Disclosure as="nav" className="w-full max-w-5xl mx-auto p-2 sm:p-6 lg:p-8">
            {({ open }) => (
                <div className="flex items-center sm:justify-between">
                    {showLogo && (
                        <Link href={route('welcome')} className="hidden sm:flex items-center m-2 rounded-full">
                            <img
                                className="h-10 w-10 rounded-full"
                                src="https://avatars.githubusercontent.com/u/4043157?v=4"
                                alt="Bryson Reece"
                            />
                        </Link>
                    )}

                    <div className={clsx(
                        'w-full sm:w-auto',
                        'rounded-lg sm:rounded-xl',
                        'bg-stone-100 dark:bg-stone-900 sm:border dark:border-0 dark:sm:border border-stone-200 dark:border-stone-800',
                        'sm:shadow-md sm:hover:shadow-xl shadow-stone-300 dark:shadow-stone-900',
                        'transition-shadow ease-in-out duration-0 sm:duration-500',
                        { 'sm:mx-auto': (!showLogo) },
                    )}>
                        <div className="flex items-center justify-between sm:justify-auto">
                            {showLogo && (
                                <Link href={route('welcome')} className="flex sm:hidden items-center my-2 mx-4 rounded-full">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://avatars.githubusercontent.com/u/4043157?v=4"
                                        alt="Bryson Reece"
                                    />
                                </Link>
                            )}

                            <Disclosure.Button className="ml-auto relative sm:hidden inline-flex items-center justify-center p-4 rounded-md text-stone-400 hover:text-stone-500 dark:text-stone-500 dark:hover:text-stone-400 -outline-offset-4">
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </Disclosure.Button>

                            <div className="hidden sm:flex sm:space-x-4 sm:p-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={route(item.route)}
                                        className={clsx(
                                            route().current(item.route) ? 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-200' : 'text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-600 dark:hover:text-stone-300',
                                            'active:text-stone-900 dark:active:text-stone-400 active:bg-stone-300 dark:active:bg-stone-700 rounded-lg px-3 py-2 text-sm font-medium inline-block'
                                        )}
                                        aria-current={route().current(item.route) ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Disclosure.Panel className="block sm:hidden p-2">
                          <div className="flex flex-col items-end space-y-2 text-right">
                              {navigation.map((item) => (
                                <Disclosure.Button
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
                                        route().current(item.route) ? [
                                          'text-stone-900 decoration-stone-500',
                                          'dark:text-stone-300 dark:decoration-stone-500',
                                          'underline underline-offset-8 decoration-2',
                                        ] : [
                                          'text-stone-500',
                                          'hover:text-stone-700 hover:decoration-stone-400',
                                          'dark:hover:text-stone-400 dark:hover:decoration-stone-700',
                                          'hover:underline hover:underline-offset-8 hover:decoration-2',
                                        ],
                                        [
                                          'active:text-stone-900 active:decoration-stone-500',
                                          'dark:active:text-stone-300 dark:active:decoration-stone-500',
                                          'dark:active:underline dark:active:underline-offset-8 dark:active:decoration-2',
                                          'rounded-lg px-3 py-2 text-sm font-medium block w-1/3',
                                        ],
                                    )}
                                    aria-current={route().current(item.route) ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                              ))}
                          </div>
                        </Disclosure.Panel>
                    </div>
                </div>
            )}
        </Disclosure>
    )
}

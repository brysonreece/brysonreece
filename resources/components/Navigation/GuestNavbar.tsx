import React, { PropsWithChildren } from 'react';
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import route from 'ziggy-js';

const navigation = [
    { name: 'About', href: route('about'), current: route().current('about') },
    { name: 'Career', href: route('career'), current: route().current('career') },
    { name: 'Projects', href: route('projects'), current: route().current('projects') },
    { name: 'Community', href: route('community'), current: route().current('community') },
    { name: 'Uses', href: route('uses'), current: route().current('uses') },
]

interface Props {
  showLogo?: boolean;
}

export function GuestNavbar({ showLogo = true }: PropsWithChildren<Props>) {
    return (
        <Disclosure as="nav" className="w-full max-w-5xl mx-auto p-2 sm:p-6 lg:p-8">
            {({ open }) => (
                <div className="flex items-center sm:justify-between">
                    {showLogo && (
                        <a href={route('welcome')} className="hidden sm:flex items-center m-2 rounded-full">
                            <img
                                className="h-10 w-10 rounded-full"
                                src="https://avatars.githubusercontent.com/u/4043157?v=4"
                                alt="Bryson Reece"
                            />
                        </a>
                    )}

                    <div className={clsx(
                        'w-full sm:w-auto',
                        'rounded-lg sm:rounded-xl',
                        'bg-white border border-gray-200',
                        'shadow-md sm:hover:shadow-xl shadow-gray-300',
                        'transition-shadow ease-in-out duration-500',
                        { 'sm:mx-auto': (!showLogo) },
                    )}>
                        <div className="flex items-center justify-between sm:justify-auto">
                            {showLogo && (
                                <a href={route('welcome')} className="flex sm:hidden items-center my-2 mx-2.5 rounded-full">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src="https://avatars.githubusercontent.com/u/4043157?v=4"
                                        alt="Bryson Reece"
                                    />
                                </a>
                            )}

                            <Disclosure.Button className="ml-auto relative sm:hidden inline-flex items-center justify-center p-4 rounded-md text-gray-400 hover:text-gray-500 -outline-offset-4">
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </Disclosure.Button>

                            <div className="hidden sm:flex sm:space-x-4 sm:p-2">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={clsx(
                                            item.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-600',
                                            'active:bg-gray-200 rounded-lg px-3 py-2 text-sm font-medium inline-block'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <Disclosure.Panel className="block sm:hidden p-2">
                            <div className="flex flex-col space-y-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={clsx(
                                            item.current ? 'bg-gray-100 text-gray-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700',
                                            'active:bg-gray-200 active:text-gray-900 block rounded-md px-3 py-2 transition-colors duration-200 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
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

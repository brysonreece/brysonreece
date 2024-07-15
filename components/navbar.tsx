'use client'

import { HTMLAttributes, use, useEffect, useState } from "react"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/util"
import { usePathname } from "next/navigation"

interface NavigationLink {
    href: string;
    label: string;
}

const defaultLinks: NavigationLink[] = [
    { href: "/about", label: "About" },
    { href: "/career", label: "Career" },
    { href: "/projects", label: "Projects" },
    { href: "/community", label: "Community" },
    { href: "/uses", label: "Uses" },
]

export function Navbar({ links = defaultLinks }: { links?: NavigationLink[] }) {
    const pathname = usePathname()
    const [currentPath, setCurrentPath] = useState(pathname)
    const [displayingLogo, setDisplayingLogo] = useState(pathname !== '/')

    useEffect(() => {
        setCurrentPath(pathname)
        setDisplayingLogo(pathname !== '/')
    }, [pathname])

    return (
        <Disclosure as="nav" className="w-full max-w-5xl mx-auto p-2 sm:p-6 lg:p-8">
            {({ open }) => (
                <div className="flex items-center sm:justify-between">
                    {displayingLogo && (
                        <Link href="/" className="hidden sm:flex items-center m-2 rounded-full">
                            <Image
                                className="h-10 w-10 rounded-full"
                                src="https://avatars.githubusercontent.com/u/4043157?v=4"
                                alt="Bryson Reece"
                                priority={true}
                                width={40}
                                height={40}
                            />
                        </Link>
                    )}

                    <div className={cn(
                        'w-full sm:w-auto',
                        'rounded-lg sm:rounded-xl',
                        'bg-stone-100 dark:bg-stone-900 sm:border dark:border-0 dark:sm:border border-stone-200 dark:border-stone-800',
                        'sm:shadow-md sm:hover:shadow-xl shadow-stone-300 dark:shadow-stone-900',
                        'transition-shadow ease-in-out duration-0 sm:duration-500',
                        { 'sm:mx-auto': (!displayingLogo) },
                    )}>
                        <div className="flex items-center justify-between sm:justify-auto">
                            {displayingLogo && (
                                <Link href="/" className="flex sm:hidden items-center my-2 mx-4 rounded-full">
                                    <Image
                                        className="h-8 w-8 rounded-full"
                                        src="https://avatars.githubusercontent.com/u/4043157?v=4"
                                        alt="Bryson Reece"
                                        priority={true}
                                        width={32}
                                        height={32}
                                    />
                                </Link>
                            )}

                            <DisclosureButton className="ml-auto relative sm:hidden inline-flex items-center justify-center p-4 rounded-md text-stone-400 hover:text-stone-500 dark:text-stone-500 dark:hover:text-stone-400 -outline-offset-4">
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </DisclosureButton>

                            <div className="hidden sm:flex sm:space-x-4 sm:p-2">
                                {links.map((link: NavigationLink) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            (link.href === currentPath) ? 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-200' : 'text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-600 dark:hover:text-stone-300',
                                            'active:text-stone-900 dark:active:text-stone-400 active:bg-stone-300 dark:active:bg-stone-700 rounded-lg px-3 py-2 text-sm font-medium inline-block'
                                        )}
                                        aria-current={(link.href === currentPath) ? 'page' : undefined}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <DisclosurePanel className="block sm:hidden p-2">
                          <div className="flex flex-col items-end space-y-2 text-right">
                              {links.map((link) => (
                                <DisclosureButton
                                    key={link.href}
                                    as="a"
                                    href={link.href}
                                    className={cn(
                                        // light - plain, hover, active
                                          // text: 500, 700, 900
                                          // decoration: n/a, 400, 500
                                        // dark - plain, hover, active
                                          // text: 500, 400, 300
                                          // decoration: n/a, 700, 500
                                        (link.href === currentPath) ? [
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
                                    aria-current={(link.href === currentPath) ? 'page' : undefined}
                                >
                                    {link.label}
                                </DisclosureButton>
                              ))}
                          </div>
                        </DisclosurePanel>
                    </div>
                </div>
            )}
        </Disclosure>
    )
}

import React, { FormEvent, PropsWithChildren } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { Link, router, usePage } from '@inertiajs/react';
import { CheckCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { ApplicationLogo } from '@/components/Branding/ApplicationLogo';
import { Container } from '@/components/Container';
import { Dropdown, DropdownLink } from '@/components/Input';
import { NavLink, ResponsiveNavLink } from '@/components/Navigation';
import { Team } from '@/types';
import useTypedPage from '@/hooks/useTypedPage';

function switchToTeam(event: FormEvent, team: Team) {
    event.preventDefault();

    router.put(
        route('teams.switch'),
        {
            team_id: team.id,
        },
        {
            preserveState: false,
        }
    );
}

function logout(event: FormEvent) {
    event.preventDefault();
    router.post(route('logout'));
}

function TeamsDropdown() {
    const page = useTypedPage();
    const user = page.props.auth.user!;

    return (
        <Dropdown
            align="right"
            width="60"
            renderTrigger={() => (
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-stone-500 bg-white hover:bg-stone-50 hover:text-stone-700 focus:outline-none focus:bg-stone-50 active:bg-stone-50 transition"
                    >
                        {page.props.auth.user!.current_team?.name}

                        <ChevronUpDownIcon className="ml-2 -mr-0.5 h-4 w-4" />
                    </button>
                </span>
            )}
        >
            <div className="w-60">
                {/* <!-- Team Management --> */}
                <div className="block px-4 py-2 text-xs text-stone-400">Manage Team</div>

                {/* <!-- Team Settings --> */}
                {user.current_team && (
                    <DropdownLink href={route('teams.show', [user.current_team])}>
                        Team Settings
                    </DropdownLink>
                )}

                <DropdownLink href={route('teams.create')}>Create New Team</DropdownLink>

                <div className="border-t border-stone-100"></div>

                {/* <!-- Team Switcher --> */}
                <div className="block px-4 py-2 text-xs text-stone-400">Switch Teams</div>

                {user.all_teams?.map((team) => (
                    <form onSubmit={(event: FormEvent) => switchToTeam(event, team)} key={team.id}>
                        <DropdownLink as="button">
                            <div className="flex items-center">
                                {team.id == user.current_team_id && (
                                    <CheckCircleIcon className="mr-2 h-5 w-5 text-green-400" />
                                )}
                                <div>{team.name}</div>
                            </div>
                        </DropdownLink>
                    </form>
                ))}
            </div>
        </Dropdown>
    );
}

function SettingsDropdown() {
    const page = useTypedPage();
    const user = page.props.auth.user!;

    return (
        <Dropdown
            align="right"
            width="48"
            renderTrigger={() => (
                <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-stone-300 transition">
                    <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.profile_photo_url}
                        alt={user.name}
                    />
                </button>
            )}
        >
            {/* <!-- Account Management --> */}
            <div className="block px-4 py-2 text-xs text-stone-400">Manage Account</div>

            <DropdownLink href={route('profile.show')}>Profile</DropdownLink>

            <DropdownLink href={route('api-tokens.index')}>API Tokens</DropdownLink>

            <div className="border-t border-stone-100"></div>

            {/* <!-- Authentication --> */}
            <form onSubmit={(event: FormEvent) => logout(event)}>
                <DropdownLink as="button">Log Out</DropdownLink>
            </form>
        </Dropdown>
    );
}

export function AppNavbar() {
    const page = useTypedPage();
    const user = page.props.auth.user!;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <nav className="bg-white border-b border-stone-200">
            <Container>
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* <!-- Logo --> */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link
                                href={route('dashboard')}
                                className="transition duration-150 ease-in-out text-stone-500 hover:text-stone-700 focus:text-stone-700"
                            >
                                <ApplicationLogo className="block h-9 w-auto" />
                            </Link>
                        </div>

                        {/* <!-- Navigation Links --> */}
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </NavLink>
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <div className="ml-3 relative">
                            <TeamsDropdown />
                        </div>

                        <div className="ml-3 relative">
                            <SettingsDropdown />
                        </div>
                    </div>

                    {/* <!-- Hamburger --> */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-stone-500 hover:bg-stone-100 focus:outline-none focus:bg-stone-100 focus:text-stone-500 transition"
                        >
                            <Bars3Icon
                                className={clsx('h-6 w-6', {
                                    hidden: showingNavigationDropdown,
                                    'inline-flex': !showingNavigationDropdown,
                                })}
                            />

                            <XMarkIcon
                                className={clsx('h-6 w-6', {
                                    hidden: !showingNavigationDropdown,
                                    'inline-flex': showingNavigationDropdown,
                                })}
                            />
                        </button>
                    </div>
                </div>
            </Container>

            {/* <!-- Responsive Navigation Menu --> */}
            <div
                className={clsx('sm:hidden', {
                    block: showingNavigationDropdown,
                    hidden: !showingNavigationDropdown,
                })}
            >
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                {/* <!-- Responsive Settings Options --> */}
                <div className="pt-4 pb-1 border-t border-stone-200">
                    <div className="flex items-center px-4">
                        <div className="flex-shrink-0 mr-3">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={user.profile_photo_url}
                                alt={user.name}
                            />
                        </div>

                        <div>
                            <div className="font-medium text-base text-stone-800">{user.name}</div>
                            <div className="font-medium text-sm text-stone-500">{user.email}</div>
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.show')} active={route().current('profile.show')}>
                            Profile
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('api-tokens.index')}
                            active={route().current('api-tokens.index')}
                        >
                            API Tokens
                        </ResponsiveNavLink>

                        {/* <!-- Authentication --> */}
                        <form method="POST" onSubmit={(event: FormEvent) => logout(event)}>
                            <ResponsiveNavLink as="button">Log Out</ResponsiveNavLink>
                        </form>

                        {/* <!-- Team Management --> */}
                        <div className="border-t border-stone-200"></div>

                        <div className="block px-4 py-2 text-xs text-stone-400">Manage Team</div>

                        {/* <!-- Team Settings --> */}
                        {user.current_team_id && (
                            <ResponsiveNavLink
                                href={route('teams.show', [user.current_team])}
                                active={route().current('teams.show')}
                            >
                                Team Settings
                            </ResponsiveNavLink>
                        )}

                        <ResponsiveNavLink href={route('teams.create')} active={route().current('teams.create')}>
                            Create New Team
                        </ResponsiveNavLink>

                        <div className="border-t border-stone-200"></div>

                        {/* <!-- Team Switcher --> */}
                        <div className="block px-4 py-2 text-xs text-stone-400">Switch Teams</div>

                        {user.all_teams?.map((team: Team) => (
                            <form onSubmit={(e) => switchToTeam(e, team)} key={team.id}>
                                <ResponsiveNavLink as="button">
                                    <div className="flex items-center">
                                        {team.id == user.current_team_id && (
                                            <CheckCircleIcon className="mr-2 h-5 w-5 text-green-400" />
                                        )}

                                        <div>{team.name}</div>
                                    </div>
                                </ResponsiveNavLink>
                            </form>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

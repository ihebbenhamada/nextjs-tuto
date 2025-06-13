'use client';
import {DocumentDuplicateIcon, HomeIcon, UserGroupIcon,} from '@heroicons/react/24/outline';
import Link from "next/link";
import {usePathname} from 'next/navigation';
import clsx from "clsx";
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
/*
const links = [
    {name: 'Home', href: '/dashboard', icon: HomeIcon},
    {
        name: 'Invoices',
        href: '/dashboard/invoices',
        icon: DocumentDuplicateIcon,
    },
    {name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon},
];
*/
type NavLink = {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    activePaths: {
        exact?: boolean;
        startsWith?: boolean;
        patterns?: RegExp[];
    };
};

const links: NavLink[] = [
    {
        name: 'Home',
        href: '/dashboard',
        icon: HomeIcon,
        activePaths: {
            exact: true, // Only active on exact match
        },
    },
    {
        name: 'Invoices',
        href: '/dashboard/invoices',
        icon: DocumentDuplicateIcon,
        activePaths: {
            startsWith: true, // Active on any sub-route
            patterns: [
                /^\/dashboard\/invoices\/create$/,
                /^\/dashboard\/invoices\/[^/]+\/edit$/,
            ],
        },
    },
    {
        name: 'Customers',
        href: '/dashboard/customers',
        icon: UserGroupIcon,
        activePaths: {
            startsWith: false, // Only active on exact match
        },
    },
];


export default function NavLinks() {
    const pathname = usePathname();
    const isActive = (link: NavLink) => {
        const {exact, startsWith, patterns} = link.activePaths;

        if (exact && pathname === link.href) return true;
        if (startsWith && pathname.startsWith(`${link.href}/`)) return true;
        if (patterns?.some(pattern => pattern.test(pathname))) return true;

        return pathname === link.href;
    };

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                /*const isActive = link.href === '/dashboard'
                    ? pathname === '/dashboard'
                    : pathname.startsWith(link.href);*/
                const active = isActive(link);
                return (
                    
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-gray-50 text-gray-600 hover:bg-sky-100 hover:text-blue-600': !active,
                                'bg-sky-100 text-blue-600': active,
                            }
                        )}
                        aria-current={active ? 'page' : undefined}
                    >
                        <LinkIcon className="w-6"/>
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}

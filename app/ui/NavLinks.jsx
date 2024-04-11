'use client';

import {
  UserGroupIcon,
  UserIcon,
  UserCircleIcon,
  GlobeAltIcon,
  FlagIcon,
  TrophyIcon,
  ChartBarIcon,
  SparklesIcon,
  StarIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  // { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: '赛事管理', href: '/dashboard/tournaments', icon: FlagIcon },
  { name: '赛事阶段管理', href: '/dashboard/stages', icon: ChartBarIcon },
  { name: '系列赛管理', href: '/dashboard/matches', icon: SparklesIcon },
  { name: '队伍管理', href: '/dashboard/teams', icon: UserGroupIcon },
  { name: '选手管理', href: '/dashboard/players', icon: UserCircleIcon },
  { name: '获奖管理', href: '/dashboard/achievements', icon: TrophyIcon },
  { name: '英雄管理', href: '/dashboard/heroes', icon: UserIcon },
  { name: '赛区管理', href: '/dashboard/regions', icon: GlobeAltIcon },
  { name: '比赛管理', href: '/dashboard/games', icon: StarIcon },
  { name: '比赛数据管理', href: '/dashboard/records', icon: ServerStackIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[36px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start",
              {
                'bg-sky-100 text-blue-600': pathname.includes(link.href), 
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

import {createSharedPathnamesNavigation} from 'next-intl/navigation'
 
export const locales = ['en', 'zh']
export const localePrefix = 'as-needed'
 
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix});
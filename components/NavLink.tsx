'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type NavLinkProps = {
  activeClass?: string;
  title: string;
} & ComponentProps<typeof Link>;

export const NavLink = ({
  href,
  className = '',
  children,
  activeClass = 'active',
  title,
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const classes = twMerge(
    className,
    'tooltip tooltip-bottom',
    isActive ? activeClass : ''
  );

  return (
    <Link legacyBehavior {...props} href={href}>
      <a className={classes} data-tip={title}>
        {children}
      </a>
    </Link>
  );
};

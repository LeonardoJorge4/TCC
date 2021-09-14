import Link, { LinkProps } from 'next/link';
import { ReactElement } from "react";

interface HeaderLinkProps extends LinkProps {
  children: ReactElement;
  icon: ReactElement;
}

export function LinkHeader({children, icon, ...rest}: HeaderLinkProps) {
  return (
    <Link {...rest}>
      {children}
    </Link>
  )
}
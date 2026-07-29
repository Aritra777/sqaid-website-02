import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };
type ButtonAsLink = CommonProps & { to: string; href?: undefined };
type ButtonAsAnchor = CommonProps & { href: string; to?: undefined };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

/**
 * Button — the site's single CTA primitive. Renders as <button>, a router
 * <Link> (via `to`), or an <a> (via `href`) while sharing one visual system.
 */
export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    ...rest
  } = props as CommonProps & Record<string, unknown>;

  const cls = cn(styles.btn, styles[variant], styles[size], className);

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {children}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    return (
      <a href={props.href} className={cls} rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

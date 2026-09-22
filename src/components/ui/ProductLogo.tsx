import type { CSSProperties } from "react";
import styles from "./ProductLogo.module.css";
export type ProductIdentity = "argus" | "abacus" | "brain" | "udm" | "kyc";
const names: Record<ProductIdentity, string> = {
  argus: "ARGUS",
  abacus: "ABACUS",
  brain: "SqAId Brain",
  udm: "UDM",
  kyc: "SqAId KYC",
};
/** Original ARGUS identity and the related vector product family. Both modes are standalone exportable assets. */
export default function ProductLogo({
  product,
  size = 40,
  decorative = false,
  className = "",
}: {
  product: ProductIdentity;
  size?: number;
  decorative?: boolean;
  className?: string;
}) {
  const alt = decorative ? "" : `${names[product]} logo`;
  return (
    <span
      className={`${styles.logo} ${className}`}
      style={{ "--logo-size": `${size}px` } as CSSProperties}
    >
      <img
        className={styles.light}
        src={`/assets/product-logos/${product}.svg`}
        width={size}
        height={size}
        alt={alt}
      />
      <img
        className={styles.dark}
        src={`/assets/product-logos/${product}-dark.svg`}
        width={size}
        height={size}
        alt={alt}
      />
    </span>
  );
}

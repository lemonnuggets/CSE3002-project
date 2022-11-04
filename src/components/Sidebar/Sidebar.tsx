import Image from "next/image";
import Link from "next/link";
import type { SidebarLink } from "types/custom";
import styles from "./Sidebar.module.css";
type Props = {
    sidebarLinks: SidebarLink[];
};
const Sidebar = ({ sidebarLinks }: Props) => {
    return (
        <div className={styles.sidebar}>
            {sidebarLinks.map((sidebarLink) => {
                return (
                    <Link
                        href={sidebarLink.href}
                        className={styles.link}
                        key={`sidebar-link-${sidebarLink.href}-${sidebarLink.text}`}
                    >
                        <Image
                            src={sidebarLink.imgSrc}
                            alt={sidebarLink.imgAlt}
                            height={sidebarLink.imgHeight}
                            width={sidebarLink.imgWidth}
                            className={styles.linkIcon}
                        />
                        <div className={styles.linkText}>
                            {sidebarLink.text}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Sidebar;

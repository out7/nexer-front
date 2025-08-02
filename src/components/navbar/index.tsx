import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

import styles from "./styles.module.scss";
import { navbarItems } from "./items";

const Navbar = () => {
  const { t } = useTranslation("nav");
  const { pathname } = useLocation();

  return (
    <nav className={styles.container}>
      {navbarItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            className={clsx(styles.navLink, isActive && styles.active)}
            to={item.href}
          >
            <item.Icon className={styles.icon} />
            <span>{t(item.labelKey)}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;

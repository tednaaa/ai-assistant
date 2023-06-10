import { NavLink } from 'react-router-dom';

import { routes } from '@renderer/shared/routes';

import styles from './navigation.module.scss';
import { FC } from 'react';
import clsx from 'clsx';

const navigationRoutes = [
  { text: 'Chat', path: routes.CHAT },
  { text: 'Generate Images', path: routes.GENERATE_IMAGES },
];

interface Props {
  isOpen: boolean;
}

export const Navigation: FC<Props> = ({ isOpen }) => {
  return (
    <nav className={clsx(styles.navigation, isOpen && styles.navigationActive)}>
      <ul className={styles.list}>
        {navigationRoutes.map((route) => {
          return (
            <li className={styles.item} key={route.path}>
              <NavLink
                className={({ isActive }) =>
                  clsx(styles.link, isActive && styles.linkActive)
                }
                to={route.path}
              >
                {route.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

import { createBrowserRouter, redirect } from 'react-router-dom';

import { routes } from '@renderer/shared/routes';

import { ChatPage } from './chat';

export const router = createBrowserRouter([
  {
    path: routes.ROOT,
    loader: () => redirect(routes.CHAT),
  },
  {
    path: routes.CHAT,
    Component: ChatPage,
  },
]);

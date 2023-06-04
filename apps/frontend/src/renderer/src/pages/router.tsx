import { createBrowserRouter, redirect } from 'react-router-dom';

import { routes } from '@/shared/routes';

import { ChatPage } from './chat';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect(routes.CHAT),
  },
  {
    path: routes.CHAT,
    Component: ChatPage,
  },
]);

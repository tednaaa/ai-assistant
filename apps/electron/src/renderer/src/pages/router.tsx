import { createBrowserRouter, redirect } from 'react-router-dom';

import { routes } from '@renderer/shared/routes';

import { ChatPage } from './chat';
import { GenerateImagesPage } from './generate-images';

export const router = createBrowserRouter([
  {
    path: routes.ROOT,
    loader: () => redirect(routes.CHAT),
  },
  {
    path: routes.CHAT,
    Component: ChatPage,
  },
  {
    path: routes.GENERATE_IMAGES,
    Component: GenerateImagesPage,
  },
]);

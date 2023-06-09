import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@renderer/pages/router';

import { parseMarkdown } from './providers/markdown';

parseMarkdown();

export const App: FC = () => {
  return <RouterProvider router={router} />;
};

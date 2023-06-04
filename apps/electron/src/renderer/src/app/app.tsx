import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@renderer/pages/router';

export const App: FC = () => {
  return <RouterProvider router={router} />;
};

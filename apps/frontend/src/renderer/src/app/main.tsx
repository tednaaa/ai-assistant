import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { app, BrowserWindow } from 'electron';

import { App } from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile('assets/index.html');
};

app.whenReady().then(() => {
  createWindow();
});

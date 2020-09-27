/**
 * @fileoverview Component: App
 * - All globally-used React Context Providers are here.
 * @author Rami Abdou
 */

import './index.scss';
import '../public/favicon.ico';

import React from 'react';
import ReactDOM from 'react-dom';

import { LoaderProvider } from '@components/Loader';
import { Toasts, ToastsProvider } from '@components/Toasts';
import { ScreenProvider } from '@state/screen';
import AppRouter from './Router';

const Background = () => <div id="app" />;

const App = () => (
  <ScreenProvider>
    <LoaderProvider>
      <ToastsProvider>
        <Background />
        <AppRouter />
        <Toasts />
      </ToastsProvider>
    </LoaderProvider>
  </ScreenProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

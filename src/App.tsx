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
import AppRouter from './Router';

const Background = () => <div id="app" />;

const App = () => (
  <LoaderProvider>
    <ToastsProvider>
      <Background />
      <AppRouter />
      <Toasts />
    </ToastsProvider>
  </LoaderProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

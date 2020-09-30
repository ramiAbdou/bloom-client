/**
 * @fileoverview State: Screen
 * - Provides window information such as the breakpoint, or if needed, the exact
 * window width.
 * @author Rami Abdou
 */

import React, { ReactNode, useContext, useEffect, useState } from 'react';

/* 
  _____                                 _   ___ _        _       
 |_   _|  _ _ __  ___ ___  __ _ _ _  __| | / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-< / _` | ' \/ _` | \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ \__,_|_||_\__,_| |___/\__\__,_|\__\___|
       |__/|_|                                                   
*/

type Breakpoint = 'D' | 'T' | 'M';

type ScreenState = {
  isMobile: boolean;
  isDesktop: boolean;
  windowWidth: number;
};

const initialState: ScreenState = {
  isDesktop: true,
  isMobile: false,
  windowWidth: 0
};

/* 
   ___         _           _       __  _  _          _   
  / __|___ _ _| |_ _____ _| |_    / / | || |___  ___| |__
 | (__/ _ \ ' \  _/ -_) \ /  _|  / /  | __ / _ \/ _ \ / /
  \___\___/_||_\__\___/_\_\\__| /_/   |_||_\___/\___/_\_\
*/

const ScreenContext = React.createContext(initialState);
export const useScreen = () => useContext(ScreenContext);

/* 
   ___             _    _         
  | _ \_ _ _____ _(_)__| |___ _ _ 
  |  _/ '_/ _ \ V / / _` / -_) '_|
  |_| |_| \___/\_/|_\__,_\___|_|  
*/

type ScreenProviderProps = { children: ReactNode };

export const ScreenProvider = ({ children }: ScreenProviderProps) => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('D');
  const [width, setWidth] = useState(window.innerWidth);

  const onWindowResize = () => {
    const { innerWidth } = window;

    if (innerWidth > 1025) setBreakpoint('D');
    else if (innerWidth <= 1024 && innerWidth >= 576) setBreakpoint('T');
    else if (innerWidth <= 575) setBreakpoint('M');

    setWidth(innerWidth);
  };

  // Add the window resize event listener.
  useEffect(() => {
    onWindowResize(); // Set the initial values.
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  // Store the values of the breakpoint, height and width in the value of the
  // Provider.
  return (
    <ScreenContext.Provider
      value={{
        isDesktop: breakpoint === 'D',
        isMobile: breakpoint === 'M',
        windowWidth: width
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};

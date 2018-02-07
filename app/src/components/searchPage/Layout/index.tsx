import * as React from 'react';


export const Layout = ({ children }) => (
  <div className='columns'>
    {children}
  </div>
);

export const LayoutSideBar = ({ children }) => (
  <div className='column is-narrow'>
    {children}
  </div>
);

export const LayoutContent = ({ children }) => (
  <div className='column'>
    {children}
  </div>
);

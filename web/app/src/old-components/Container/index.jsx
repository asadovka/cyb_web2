import React from 'react';

const Container = ({ children }) => (
  <div className='container' style={{ width: 1090, paddingTop: 60, margin: '0 auto' }}>
    {children}
  </div>
)

export default Container;

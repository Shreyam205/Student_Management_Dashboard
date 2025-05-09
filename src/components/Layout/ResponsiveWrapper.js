import React from 'react';
import './ResponsiveWrapper.css'; // Create this file

const ResponsiveWrapper = ({ children }) => {
  return <div className="responsive-container">{children}</div>;
};

export default ResponsiveWrapper;
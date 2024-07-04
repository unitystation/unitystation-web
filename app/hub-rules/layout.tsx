import React from 'react';
import FullPage from "../common/uiLibrary/Layouters/fullPage";

const PageLayout = ({ children }) => {
  return <FullPage>{children}</FullPage>;
};

export default PageLayout;
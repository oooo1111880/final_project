import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import './Css/BreadcrumbBar.css'; // 引入自定義的 CSS

const BreadcrumbBar = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
      <div>
        <div className="breadcrumb-bar">
          <h2>呼吸器相關預測系統</h2>
        </div>
        <Outlet />
      </div>
  );
};

export default BreadcrumbBar;

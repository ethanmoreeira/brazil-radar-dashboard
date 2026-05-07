import { Outlet } from 'react-router-dom';
import Menu from './Menu';

const PrivateLayout = () => {
  return (
    <div className="app-shell">
      <Menu />
      <main className="page-container container">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;

import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../layouts/Header';

function AppLayout() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') ?? 'Usuario';
  const savedRole = localStorage.getItem('userRole');
  const userRole =
    savedRole === 'admin' || savedRole === 'hr' || savedRole === 'employee'
      ? savedRole
      : 'employee';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header user={{ name: userName, role: userRole }} onLogout={handleLogout} />
      <Outlet />
    </div>
  );
}

export default AppLayout;

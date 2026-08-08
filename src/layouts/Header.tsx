import { Link, useLocation } from 'react-router-dom';
import type { EmployeeRole } from '../types';

interface HeaderProps {
  user?: {
    name: string;
    role: EmployeeRole;
  };
  onLogout?: () => void;
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/empleados', label: 'Empleados' },
];

function Header({ user, onLogout }: HeaderProps) {
  const { pathname } = useLocation();

  return (
    <header className="bg-brand-800 text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-xl shadow-sm">
            👥
          </span>
          <span className="font-bold text-xl tracking-tight">Mini RRHH</span>
        </div>

        {/* Navegaci�n */}
        {user && (
          <nav className="hidden sm:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  pathname.startsWith(item.to)
                    ? 'bg-white/20 text-white'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Usuario y logout */}
        {user && (
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-sm text-white/80">{user.name}</span>
            <span className="text-xs bg-blue-500 px-2 py-0.5 rounded-full uppercase font-medium">
              {user.role}
            </span>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-sm text-white/75 hover:text-white border border-white/30 hover:border-white/60 px-3 py-1.5 rounded-md transition-colors"
              >
                Salir
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

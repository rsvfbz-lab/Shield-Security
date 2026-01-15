
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: 'fa-chart-line', label: 'Dashboard' },
    { path: '/usuarios', icon: 'fa-users', label: 'Usuários' },
    { path: '/rondas', icon: 'fa-motorcycle', label: 'Rondas' },
    { path: '/postos', icon: 'fa-building-shield', label: 'Postos Fixos' },
    { path: '/logs', icon: 'fa-list-check', label: 'Logs de Eventos' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <i className="fa-solid fa-shield-halved text-2xl"></i>
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight leading-none">SENTINEL</h1>
            <span className="text-xs text-blue-400 font-medium tracking-widest">GUARD SYSTEM</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5`}></i>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-red-600/10 hover:text-red-500 rounded-lg transition-all"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span className="font-medium">Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-8 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-slate-800">
              {menuItems.find(m => m.path === location.pathname)?.label || 'Bem-vindo'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <i className="fa-solid fa-bell"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 leading-none">Admin Master</p>
                <p className="text-xs text-slate-500">Logado agora</p>
              </div>
              <img
                src="https://picsum.photos/seed/admin/40/40"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-100"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

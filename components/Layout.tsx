
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: 'fa-chart-pie', label: 'Home' },
    { path: '/rondas', icon: 'fa-motorcycle', label: 'Rondas' },
    { path: '/postos', icon: 'fa-building-shield', label: 'Postos' },
    { path: '/usuarios', icon: 'fa-users-gear', label: 'Equipe' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 bg-slate-900 text-white flex-col shadow-2xl z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <i className="fa-solid fa-shield-halved text-2xl text-white"></i>
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tighter leading-none">SENTINEL</h1>
              <span className="text-[10px] text-blue-400 font-bold tracking-[0.2em] uppercase">Security OS</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <i className={`fa-solid ${item.icon} text-lg w-6 text-center`}></i>
                <span className="font-semibold tracking-tight">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800/50">
          <div className="bg-slate-800/40 p-4 rounded-2xl mb-4 border border-white/5">
             <div className="flex items-center gap-3">
               <img src="https://picsum.photos/seed/user1/40/40" className="w-10 h-10 rounded-full border border-blue-500/30" alt="" />
               <div>
                 <p className="text-sm font-bold truncate">Admin Central</p>
                 <p className="text-[10px] text-blue-400 font-medium">Nível 5 • Online</p>
               </div>
             </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-5 py-3 w-full text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all font-bold text-sm"
          >
            <i className="fa-solid fa-power-off"></i>
            Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden h-full">
        {/* Mobile Header */}
        <header className="lg:hidden bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-blue-500"></i>
            <span className="font-black tracking-tighter">SENTINEL</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
            <i className="fa-solid fa-bell text-sm"></i>
          </button>
        </header>

        {/* Desktop Top Nav */}
        <header className="hidden lg:flex bg-white h-20 items-center justify-between px-10 border-b border-slate-200">
           <h2 className="text-xl font-black text-slate-800 tracking-tight">
             {menuItems.find(m => m.path === location.pathname)?.label || 'Operações'}
           </h2>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-slate-500 text-sm font-bold">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Servidor: Ativo
              </div>
              <button className="p-3 text-slate-400 hover:text-blue-600 transition-colors">
                <i className="fa-solid fa-gear"></i>
              </button>
           </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto pb-24 lg:pb-8 p-4 lg:p-10 no-scrollbar animate-slide-up">
          {children}
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all ${
                location.pathname === item.path ? 'text-blue-600 scale-110' : 'text-slate-400'
              }`}
            >
              <i className={`fa-solid ${item.icon} text-xl`}></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          ))}
          <button onClick={onLogout} className="text-slate-400 flex flex-col items-center gap-1">
             <i className="fa-solid fa-power-off text-xl"></i>
             <span className="text-[10px] font-bold uppercase tracking-widest">Sair</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default Layout;

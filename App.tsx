
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import UserManagement from './components/UserManagement';
import Patrols from './components/Patrols';
import Posts from './components/Posts';

const Dashboard: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
      <div className="relative z-10">
        <h2 className="text-3xl font-black tracking-tighter mb-2">Central de Operações</h2>
        <p className="text-blue-100 font-medium max-w-md">Bem-vindo ao Sentinel Guard. 14 agentes ativos em campo e 2 rondas em andamento.</p>
        <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
          Relatório de Turno
        </button>
      </div>
      <i className="fa-solid fa-tower-observation absolute -bottom-10 -right-10 text-[12rem] text-blue-500/30"></i>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
           <div className="flex items-center justify-between mb-8">
             <h3 className="font-black text-xl text-slate-800 tracking-tight">Geo-Monitoramento</h3>
             <div className="flex gap-2">
               <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none self-center">Live</span>
             </div>
           </div>
           <div className="aspect-video bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
              <i className="fa-solid fa-satellite-dish text-5xl mb-4"></i>
              <p className="font-bold">Mapeamento em Tempo Real</p>
              <p className="text-xs font-medium">Aguardando coordenadas dos terminais móveis...</p>
           </div>
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white">
        <h3 className="text-xl font-black mb-8 tracking-tight">Ocorrências Recentes</h3>
        <div className="space-y-4">
          {[
            { msg: 'Posto 4: Ronda atrasada', time: 'Agora', priority: 'high' },
            { msg: 'Vtr-02: Check-in realizado', time: '12m atrás', priority: 'low' },
            { msg: 'Sensor Garagem: Ativado', time: '1h atrás', priority: 'med' },
          ].map((log, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className={`w-1.5 h-auto rounded-full ${
                log.priority === 'high' ? 'bg-red-500' : log.priority === 'med' ? 'bg-amber-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm font-bold">{log.msg}</p>
                <span className="text-[10px] text-white/30 font-bold uppercase">{log.time}</span>
              </div>
              <button className="text-white/20 hover:text-white"><i className="fa-solid fa-chevron-right text-xs"></i></button>
            </div>
          ))}
        </div>
        <button className="w-full mt-8 py-4 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-white/40 hover:bg-white/5 transition-colors">
          Ver Histórico Completo
        </button>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <HashRouter>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route
            path="/"
            element={<Layout onLogout={handleLogout}><Dashboard /></Layout>}
          >
            <Route index element={<Dashboard />} />
            <Route path="usuarios" element={<UserManagement />} />
            <Route path="rondas" element={<Patrols />} />
            <Route path="postos" element={<Posts />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </HashRouter>
  );
};

export default App;

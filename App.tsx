
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import UserManagement from './components/UserManagement';

const Dashboard: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 min-h-[400px]">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Visão Geral Operacional</h2>
        <div className="bg-slate-100 rounded-2xl flex items-center justify-center h-64 border-2 border-dashed border-slate-300">
           <div className="text-center text-slate-400">
             <i className="fa-solid fa-map-location-dot text-4xl mb-3"></i>
             <p className="font-medium">Mapa de Operações em Tempo Real</p>
             <p className="text-xs">Iniciando módulos de rastreamento...</p>
           </div>
        </div>
      </div>
      <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white">
        <h2 className="text-xl font-bold mb-6">Alertas Críticos</h2>
        <div className="space-y-4">
          {[
            { type: 'Alerta', msg: 'Botão de pânico acionado: Posto 04', time: '2m atrás', color: 'red' },
            { type: 'Info', msg: 'Ronda 02 iniciou trajeto noturno', time: '15m atrás', color: 'blue' },
            { type: 'Warning', msg: 'Bateria baixa: Dispositivo Terminal 12', time: '45m atrás', color: 'amber' },
          ].map((alert, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className={`w-1 h-full bg-${alert.color}-500 rounded-full`}></div>
              <div>
                <p className="text-xs font-bold text-white/50 uppercase">{alert.type}</p>
                <p className="text-sm font-medium">{alert.msg}</p>
                <p className="text-[10px] text-white/40 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
        
        {/* Specific layout for child routes if we use nested routes properly */}
        {isAuthenticated && (
           <Route path="/usuarios" element={<Layout onLogout={handleLogout}><UserManagement /></Layout>} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default App;


import React, { useState } from 'react';

interface Patrol {
  id: string;
  vehicle: string;
  guard: string;
  route: string;
  status: 'Iniciada' | 'Em Pausa' | 'Concluída';
  time: string;
}

const Patrols: React.FC = () => {
  const [patrols] = useState<Patrol[]>([
    { id: 'R102', vehicle: 'V-04 (MOTO)', guard: 'Sgt. Silva', route: 'Setor Norte A', status: 'Iniciada', time: '14:20' },
    { id: 'R105', vehicle: 'V-12 (VTR)', guard: 'Insp. Souza', route: 'Pátio Logístico', status: 'Em Pausa', time: '15:10' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter leading-none">Rondas Ativas</h2>
          <p className="text-sm text-slate-500 mt-1">Monitoramento de deslocamento tático.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/20 flex items-center gap-2">
          <i className="fa-solid fa-map-location-dot"></i>
          Nova Missão
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patrols.map(p => (
          <div key={p.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                   <i className="fa-solid fa-motorcycle text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{p.vehicle}</h4>
                  <p className="text-xs text-slate-500 font-medium">ID: {p.id} • {p.guard}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                p.status === 'Iniciada' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {p.status}
              </span>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <i className="fa-solid fa-route text-slate-400"></i>
                 <span className="text-sm font-bold text-slate-700">{p.route}</span>
              </div>
              <span className="text-xs font-bold text-slate-400 tracking-tighter">{p.time}</span>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 text-xs font-bold bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200">HISTÓRICO</button>
              <button className="flex-1 py-2 text-xs font-bold bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100">LOCALIZAR</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patrols;

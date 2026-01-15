
import React from 'react';

const Posts: React.FC = () => {
  const posts = [
    { name: 'Portaria Principal', status: 'Ocupado', guard: 'Marcos Santos', alerts: 0 },
    { name: 'Depósito de Cargas', status: 'Ocupado', guard: 'Ana Paula', alerts: 2 },
    { name: 'Garagem Subsolo', status: 'Vago', guard: '--', alerts: 0 },
  ];

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter leading-none">Postos Fixos</h2>
          <p className="text-sm text-slate-500 mt-1">Status de guarnição em tempo real.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm overflow-hidden relative">
            {post.alerts > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 text-[10px] font-black rounded-bl-xl animate-pulse">
                {post.alerts} ALERTAS
              </div>
            )}
            <h3 className="font-black text-slate-800 text-lg mb-1">{post.name}</h3>
            <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${post.status === 'Ocupado' ? 'text-green-500' : 'text-slate-400'}`}>
              ● {post.status}
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Operador</span>
                <span className="text-slate-800 font-bold">{post.guard}</span>
              </div>
              <div className="h-px bg-slate-100 w-full"></div>
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-slate-900 text-white py-3 rounded-2xl text-xs font-bold hover:bg-blue-600 transition-colors">
                  CHECK-IN
                </button>
                <button className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;

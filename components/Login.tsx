
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating authentication
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Visual Section */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
        <img
          src="https://picsum.photos/seed/security/1200/800"
          alt="Security background"
          className="absolute inset-0 object-cover w-full h-full opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="relative z-10 p-20 flex flex-col justify-end h-full">
          <div className="mb-8">
            <div className="bg-blue-600 inline-block p-4 rounded-2xl mb-6 shadow-2xl shadow-blue-500/20">
              <i className="fa-solid fa-shield-halved text-5xl text-white"></i>
            </div>
            <h1 className="text-6xl font-black text-white leading-tight mb-4 tracking-tight">
              A Próxima Geração em <br />
              <span className="text-blue-500">Gestão de Segurança</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
              Sistema robusto para coordenação de rondas motorizadas, controle de postos e inteligência operacional.
            </p>
          </div>
          <div className="flex gap-12 text-slate-400">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-location-dot text-blue-500 text-xl"></i>
              <span className="font-medium">Rastreamento Real-time</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-bolt text-blue-500 text-xl"></i>
              <span className="font-medium">Resposta Instantânea</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="bg-blue-600 inline-block p-3 rounded-xl mb-4">
              <i className="fa-solid fa-shield-halved text-2xl text-white"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Sentinel Guard</h2>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Bem-vindo de volta</h2>
            <p className="text-slate-500">Entre com suas credenciais para acessar o painel administrativo.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail Corporativo</label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@seguranca.com.br"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700">Senha de Acesso</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Esqueceu a senha?</a>
              </div>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600 cursor-pointer">Manter conectado por 30 dias</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-70 disabled:transform-none"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  Verificando...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Acessar Sistema
                </>
              )}
            </button>
          </form>

          <footer className="mt-12 text-center text-sm text-slate-500">
            <p>&copy; 2024 Sentinel Security Systems Inc.</p>
            <div className="flex justify-center gap-4 mt-2 font-medium">
              <a href="#" className="hover:text-blue-600">Suporte</a>
              <span className="text-slate-300">•</span>
              <a href="#" className="hover:text-blue-600">Termos</a>
              <span className="text-slate-300">•</span>
              <a href="#" className="hover:text-blue-600">Privacidade</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;

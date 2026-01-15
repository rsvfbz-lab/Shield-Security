
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { generateRoleDescription } from '../services/geminiService';

const INITIAL_USERS: User[] = [
  { id: '1', name: 'Ricardo Oliveira', email: 'ricardo@sentinel.com', role: UserRole.ADMIN, status: 'Ativo', lastLogin: '10 min atrás' },
  { id: '2', name: 'Ana Silva', email: 'ana.silva@sentinel.com', role: UserRole.SUPERVISOR, status: 'Ativo', lastLogin: '1 hora atrás' },
  { id: '3', name: 'Carlos Santos', email: 'carlos.ronda@sentinel.com', role: UserRole.PATROL, status: 'Ativo', lastLogin: 'Ativo agora' },
  { id: '4', name: 'Marcos Souza', email: 'marcos.posto@sentinel.com', role: UserRole.STATIONARY, status: 'Inativo', lastLogin: '2 dias atrás' },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [roleDescription, setRoleDescription] = useState('');
  
  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: UserRole.PATROL,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setRoleDescription('');
  };

  const handleRoleChange = async (newRole: UserRole) => {
    setNewUser(prev => ({ ...prev, role: newRole }));
    setIsGeneratingDesc(true);
    const desc = await generateRoleDescription(newRole);
    setRoleDescription(desc);
    setIsGeneratingDesc(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Ativo',
      lastLogin: 'Nunca'
    };
    setUsers([user, ...users]);
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', role: UserRole.PATROL });
  };

  const deleteUser = (id: string) => {
    if (confirm('Tem certeza que deseja remover este usuário?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Usuários', val: users.length, icon: 'fa-users', color: 'blue' },
          { label: 'Ativos em Campo', val: 12, icon: 'fa-user-shield', color: 'green' },
          { label: 'Rondas Motorizadas', val: 8, icon: 'fa-motorcycle', color: 'purple' },
          { label: 'Pendentes de Login', val: 2, icon: 'fa-clock', color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                <i className={`fa-solid ${stat.icon} text-${stat.color}-600 text-xl`}></i>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.val}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Diretório de Colaboradores</h3>
            <p className="text-sm text-slate-500">Gerencie permissões e visualize o status atual da equipe.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Buscar usuário..."
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none text-sm w-full md:w-64"
              />
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 shadow-md shadow-blue-500/10"
            >
              <i className="fa-solid fa-plus"></i>
              Novo Usuário
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Usuário</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Função</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Último Acesso</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      user.role === UserRole.ADMIN ? 'bg-indigo-100 text-indigo-700' :
                      user.role === UserRole.SUPERVISOR ? 'bg-blue-100 text-blue-700' :
                      user.role === UserRole.PATROL ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${user.status === 'Ativo' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                      <span className="text-sm font-medium text-slate-700">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{user.lastLogin}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden transform transition-all">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Cadastrar Colaborador</h2>
                <p className="text-sm text-slate-500">Adicione novos membros à equipe de segurança.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    value={newUser.name}
                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">E-mail Corporativo</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Cargo / Função</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none"
                    value={newUser.role}
                    onChange={e => handleRoleChange(e.target.value as UserRole)}
                  >
                    {Object.values(UserRole).map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                {/* AI Assistant Insight */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-robot text-blue-600"></i>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Insight da Função (IA)</span>
                  </div>
                  {isGeneratingDesc ? (
                    <div className="flex items-center gap-2 text-blue-400 text-sm">
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                      Gerando diretrizes...
                    </div>
                  ) : (
                    <p className="text-sm text-blue-800 leading-relaxed italic">
                      {roleDescription || "Selecione um cargo para gerar as diretrizes automáticas via IA."}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                >
                  Confirmar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

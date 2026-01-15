
export enum UserRole {
  ADMIN = 'Administrador',
  SUPERVISOR = 'Supervisor',
  PATROL = 'Ronda Motorizada',
  STATIONARY = 'Posto Fixo'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Ativo' | 'Inativo';
  lastLogin?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

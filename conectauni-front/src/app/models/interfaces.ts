export interface AuthRequest { email: string; password: string; fullName?: string; role?: string; }
export interface AuthResponse { token: string; email: string; role: string; }
export interface ConectaEvent { id?: number; title: string; description: string; startAt: string; endAt: string; location: string; budget: number; }
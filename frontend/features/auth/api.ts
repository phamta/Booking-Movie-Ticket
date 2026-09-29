import { apiClient } from '@/lib/api-client';

export const login = (data: any) => apiClient.post('/auth/login', data).then(res => res.data);
export const register = (data: any) => apiClient.post('/auth/register', data).then(res => res.data);
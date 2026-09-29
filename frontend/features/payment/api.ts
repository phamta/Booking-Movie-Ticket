import { apiClient } from '@/lib/api-client';

export const createPayment = (data: { bookingId: number, amount: number, method: string }) => apiClient.post('/payments', data).then(res => res.data);
export const confirmPayment = (id: number) => apiClient.post(`/payments/${id}/confirm`).then(res => res.data);
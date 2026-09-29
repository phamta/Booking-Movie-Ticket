// The package is available at runtime, but its declarations may not be installed in this environment.
// @ts-expect-error: socket.io-client is an optional dependency for this module.
import { io } from 'socket.io-client';
export const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000', { autoConnect: false });
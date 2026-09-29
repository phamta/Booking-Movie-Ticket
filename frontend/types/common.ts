export type Role = 'ADMIN' | 'CUSTOMER';
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  status: string;
}
export interface Movie {
  id: number;
  title: string;
  description: string;
  durationMinutes: number;
  releaseDate: string;
  ageRating: string;
  posterUrl: string;
  status: string;
}
export interface Cinema {
  id: number;
  name: string;
  address: string;
  phone: string;
  rooms?: Room[];
}
export interface Room {
  id: number;
  cinemaId: number;
  name: string;
  numRows: number;
  numCols: number;
  capacity: number;
}
export interface Showtime {
  id: number;
  movieId: number;
  roomId: number;
  startTime: string;
  endTime: string;
  movie?: Movie;
  room?: Room & { cinema?: Cinema };
}
export interface Seat {
  id: number;
  rowNumber: number;
  columnNumber: number;
  seatCode: string;
  seatType: string;
}
export interface ShowtimeSeat {
  id: number;
  showtimeId: number;
  seatId: number;
  status: 'AVAILABLE' | 'HELD' | 'BOOKED';
  price: number;
  seat: Seat;
}
export interface Booking {
  id: number;
  userId: number;
  showtimeId: number;
  bookingCode: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'EXPIRED';
  totalAmount: number;
  expiresAt: string;
  createdAt: string;
  showtime?: Showtime;
  bookingSeats?: { seat: Seat, price: number }[];
}
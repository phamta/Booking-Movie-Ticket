import { useState, useEffect } from 'react';

export function useCountdown(targetDate: string | Date | null) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!targetDate) return;
    const target = new Date(targetDate).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(Math.floor(distance / 1000));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return { timeLeft, minutes, seconds, isExpired: timeLeft <= 0 && !!targetDate };
}
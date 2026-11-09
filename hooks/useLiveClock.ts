'use client';

import { useState, useEffect } from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function useLiveClock() {
  const [time, setTime] = useState('9:41am');
  const [date, setDate] = useState('12 March, 2025');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;

      setTime(`${hours}:${minutes}${ampm}`);

      const day = now.getDate();
      const monthName = MONTHS[now.getMonth()];
      const year = now.getFullYear();
      setDate(`${day} ${monthName}, ${year}`);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return { time, date };
}


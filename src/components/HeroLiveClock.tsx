'use client';

import React, { useState, useEffect } from 'react';

export default function HeroLiveClock() {
  const [time, setTime] = useState<string>('09:42 PM');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="tabular-nums">
      {mounted ? time : '09:42 PM'} (PKT)
    </span>
  );
}

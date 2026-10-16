'use client';

import React, { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || !time) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-center justify-center px-4 py-2.5 rounded-2xl bg-[#171A1C]/80 backdrop-blur-md border border-[#2B3033] shadow-xl shadow-black/40 group hover:border-[#FFB020]/40 transition-all duration-300"
      aria-label={`Current local time in Pakistan: ${time}`}
    >
      <div className="text-[10px] text-[#A7ADB2] font-mono tracking-wider uppercase mb-0.5">
        Pakistan (PKT)
      </div>
      <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] font-['Outfit'] tabular-nums tracking-wide">
        {time}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 
                 flex flex-col items-center justify-center 
                 px-4 py-2 md:px-6 md:py-4
                 rounded-2xl 
                 bg-[#1a1a2e]/60 backdrop-blur-md
                 border border-white/10
                 shadow-2xl shadow-purple-500/10
                 hover:shadow-purple-500/20
                 hover:border-purple-500/30
                 transition-all duration-500
                 hover:-translate-y-1
                 z-40
                 group"
    >
      <div className="text-xs text-gray-500 mb-1 font-['Outfit'] uppercase tracking-wider">
      </div>
      <div className="text-lg md:text-2xl font-bold 
                    text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400
                    tracking-wide font-['Outfit'] tabular-nums">
        {time}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-5 blur-xl rounded-2xl transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default Clock;

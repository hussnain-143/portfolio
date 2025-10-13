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
      className="fixed bottom-50 right-3 sm:bottom-50 sm:right-4 
                 flex items-center justify-center 
                 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 
                 rounded-full border-2 border-lime-400/50 
                 bg-white/10 backdrop-blur-sm 
                 shadow-xl shadow-lime-500/30"
    >
      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-lime-700 tracking-wide drop-shadow-md text-center">
        {time}
      </div>
    </div>
  );
};

export default Clock;

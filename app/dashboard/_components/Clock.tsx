"use client";

import { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";

export function Clock() {
  const [currentHour, setCurrentHour] = useState("");
  const [currentMinute, setCurrentMinute] = useState("");
  const [animateHour, setAnimateHour] = useState(false);
  const [animateMinute, setAnimateMinute] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const newHour = now.getHours().toString().padStart(2, "0");
      const newMinute = now.getMinutes().toString().padStart(2, "0");

      if (newHour !== currentHour) {
        setCurrentHour(newHour);
        setAnimateHour(true);
        setTimeout(() => setAnimateHour(false), 500);
      }

      if (newMinute !== currentMinute) {
        setCurrentMinute(newMinute);
        setAnimateMinute(true);
        setTimeout(() => setAnimateMinute(false), 500);
      }
    };

    const timerId = setInterval(updateClock, 1000);
    return () => clearInterval(timerId);
  }, [currentHour, currentMinute]);

  return (
    <div className="flex items-center max-md:justify-center space-x-1 max-sm:hidden">
      <div
        className={cn(
          "w-28 h-40 bg-primary font-black text-6xl grid place-items-center text-background relative",
          animateHour ? "rotate-hor-center" : ""
        )}
      >
        {currentHour}
        <span className="w-full h-[1px] bg-border absolute opacity-40" />
      </div>
      <div
        className={cn(
          "w-28 h-40 bg-primary font-black text-6xl grid place-items-center text-background relative",
          animateMinute ? "rotate-hor-center" : ""
        )}
      >
        {currentMinute}
        <span className="w-full h-[1px] bg-border absolute opacity-40" />
      </div>
    </div>
  );
}

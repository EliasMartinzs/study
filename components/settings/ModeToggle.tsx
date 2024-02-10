"use client";

import { useRef } from "react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const ref = useRef<HTMLInputElement>(null);

  const toggleTheme = () => {
    const theme = ref.current?.checked ? "light" : "dark";
    setTheme(theme);
  };

  return (
    <label className="switch">
      <input ref={ref} type="checkbox" onChange={toggleTheme} />
      <span className="slider" />
    </label>
  );
}

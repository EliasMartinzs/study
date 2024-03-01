"use client";

import { Button } from "../../../components/ui/button";
import { useApiFullScreen } from "../../../hooks/useApiFullScreen";
import { ExitIcon } from "@radix-ui/react-icons";
import { Pomodoro } from "./Pomodoro";
import { Circle } from "lucide-react";

export function UltraFoco() {
  const { exitFullScreen, goFullScreen, isFullScreen } = useApiFullScreen();

  return (
    <div>
      <span onClick={goFullScreen}>
        <Circle className="text-3xl lg:text-5xl cursor-pointer" />
      </span>

      {isFullScreen && (
        <div className="transition-all absolute inset-0 z-[999999] bg-background w-full h-screen">
          <Button
            variant="clean"
            className="absolute z-[999999] top-0 right-0 m-5"
            onClick={exitFullScreen}
          >
            <ExitIcon className="w-7 h-7 cursor-pointer" />
          </Button>

          <div className="w-full h-full grid place-items-center">
            <Pomodoro />
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { SiAbbrobotstudio } from "react-icons/si";
import { Button } from "../../../components/ui/button";
import { useApiFullScreen } from "../../../hooks/useApiFullScreen";
import { ExitIcon } from "@radix-ui/react-icons";
import { cn } from "../../../lib/utils";
import { Pomodoro } from "./Pomodoro";

export function UltraFoco() {
  const { exitFullScreen, goFullScreen, isFullScreen } = useApiFullScreen();

  return (
    <div>
      <div className="fixed bottom-0 right-0 p-3">
        <Button
          variant="clean"
          className="text-3xl lg:text-5xl"
          onClick={goFullScreen}
        >
          <SiAbbrobotstudio />
        </Button>
      </div>

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

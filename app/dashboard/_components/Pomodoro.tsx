import React, { useState, useEffect } from "react";

import { FaPlay, FaPause } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { VscSettings } from "react-icons/vsc";
import { cn } from "../../../lib/utils";

import { toast } from "sonner";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

interface CircularProgressBarProps {
  size: number;
  progress: number;
  strokeWidth: number;
  children: React.ReactNode;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  size,
  progress,
  strokeWidth,
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * progress) / 100;

  return (
    <div className="relative">
      <svg width={size} height={size} viewBox={viewBox}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          fill="transparent"
          stroke="#4d4d4d"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          fill="transparent"
          className="stroke-primary"
          strokeLinecap="round"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          fontFamily="Arial"
          textAnchor="middle"
          alignmentBaseline="middle"
          transform={`translate(0, ${strokeWidth / 2})`}
          className="fill-primary font-black text-5xl lg:text-6xl"
        >
          {children}
        </text>
      </svg>
    </div>
  );
};

export function Pomodoro() {
  const [workTimeConfig, setWorkTimeConfig] = useState(25 * 60);
  const [shortBreakTimeConfig, setShortBreakTimeConfig] = useState(5 * 60);
  const [longBreakTimeConfig, setLongBreakTimeConfig] = useState(15 * 60);
  const [cyclesBeforeLongBreak, _] = useState(4);
  const [tempTime, setTempTime] = useState({
    workTime: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const [secondsLeft, setSecondsLeft] = useState(workTimeConfig);
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [totalTime, setTotalTime] = useState(workTimeConfig);
  const [cycleCount, setCycleCount] = useState(0);

  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [toggleTime, setToggleTime] = useState<"pomodoro" | "short" | "long">(
    "pomodoro"
  );

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSecondsLeft((prevSecondsLeft) => {
        if (prevSecondsLeft - 1 <= 0) {
          clearInterval(interval);
          setIsActive(false);

          if (isWorkTime) {
            const newCycleCount = cycleCount + 1;
            setCycleCount(newCycleCount);

            if (newCycleCount >= cyclesBeforeLongBreak) {
              setSecondsLeft(longBreakTimeConfig);
              setTotalTime(longBreakTimeConfig);
              setCycleCount(0);
              toast.message("Pausa Longa Agora", {
                description:
                  "Ótimo trabalho! Agora é hora de uma pausa mais longa. Aproveite para se afastar um pouco e voltar ainda mais revigorado.",
              });
            } else {
              setSecondsLeft(shortBreakTimeConfig);
              setTotalTime(shortBreakTimeConfig);
              toast.message("Tempo de Descanso", {
                description:
                  "Você merece uma pausa curta. Relaxe por um momento e recarregue as energias.",
              });
            }
            setIsWorkTime(false);
          } else {
            setSecondsLeft(workTimeConfig);
            setTotalTime(workTimeConfig);
            setIsWorkTime(true);
          }

          return 0;
        }

        return prevSecondsLeft - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isActive,
    isWorkTime,
    cycleCount,
    workTimeConfig,
    shortBreakTimeConfig,
    longBreakTimeConfig,
    cyclesBeforeLongBreak,
  ]);

  const toggle = () => {
    setIsActive(!isActive);

    toast.message("Hora de Focar!", {
      description:
        "Seu período de trabalho começou. Vamos alcançar aqueles objetivos!",
    });
  };

  const reset = () => {
    setIsActive(false);
    setIsWorkTime(true);
    setSecondsLeft(workTimeConfig);
    setTotalTime(workTimeConfig);
    setCycleCount(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleAllTime = () => {
    const newWorkTimeConfig = tempTime.workTime * 60;
    const newShortBreakTimeConfig = tempTime.shortBreak * 60;
    const newLongBreakTimeConfig = tempTime.longBreak * 60;

    setWorkTimeConfig(newWorkTimeConfig);
    setShortBreakTimeConfig(newShortBreakTimeConfig);
    setLongBreakTimeConfig(newLongBreakTimeConfig);

    if (!isActive && isWorkTime) {
      setSecondsLeft(newWorkTimeConfig);
      setTotalTime(newWorkTimeConfig);
    }

    setToggleTime("pomodoro");

    reset();
  };

  const handleTempTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTempTime((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const shortBreak = () => {
    setIsActive(false);
    setSecondsLeft(tempTime.shortBreak * 60);
    setTotalTime(tempTime.shortBreak * 60);

    setToggleTime("short");
  };

  const longBreak = () => {
    setIsActive(false);
    setSecondsLeft(tempTime.longBreak * 60);
    setTotalTime(tempTime.longBreak * 60);
    setToggleTime("long");
  };

  const progressPercentage = 100 - (secondsLeft / totalTime) * 100;

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="flex flex-col gap-y-10 items-center justify-center">
        <div className="flex bg-primary rounded-full gap-x-1 text-background text-lg font-semibold py-1 px-5">
          <div
            className={cn(
              "p-3 cursor-pointer",
              toggleTime === "pomodoro" && "font-black"
            )}
            onClick={handleAllTime}
          >
            Pomodoro
          </div>
          <div
            className={cn(
              "p-3 border-r border-l cursor-pointer",
              toggleTime === "short" && "font-black"
            )}
            onClick={shortBreak}
          >
            Pausa curta
          </div>
          <div
            className={cn(
              "p-3 cursor-pointer",
              toggleTime === "long" && "font-black"
            )}
            onClick={longBreak}
          >
            Pausa longa
          </div>
        </div>

        <CircularProgressBar
          progress={progressPercentage}
          size={300}
          strokeWidth={4}
        >
          {formatTime(secondsLeft)}
        </CircularProgressBar>

        <div className="space-x-6">
          <button onClick={toggle}>
            {isActive ? (
              <FaPause className="text-3xl cursor-pointer" />
            ) : (
              <FaPlay className="text-3xl cursor-pointer" />
            )}
          </button>
          <button onClick={reset}>
            <RxReset className="text-3xl cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="my-4">
        <button onClick={() => setSettingsIsOpen(!settingsIsOpen)}>
          <VscSettings className="text-3xl cursor-pointer" />
        </button>
      </div>

      <div>
        {settingsIsOpen && (
          <div
            className={cn(
              "flex flex-col gap-x-3 items-center justify-center text-start gap-5",
              settingsIsOpen && "slide-in-bottom transition-all"
            )}
          >
            <div className="flex items-center justify-normal gap-x-5 max-sm:px-5">
              <div className="space-y-3">
                <span className="">Tempo de estudo (minutos)</span>
                <Input
                  type="number"
                  name="workTime"
                  value={tempTime.workTime}
                  onChange={handleTempTime}
                  className="border rounded-md focus:border-primary p-4 focus:outline-none"
                />
              </div>
              <div className="space-y-3">
                <span>Pausa Curta (minutos)</span>
                <Input
                  type="number"
                  name="shortBreak"
                  value={tempTime.shortBreak}
                  onChange={handleTempTime}
                  className="border rounded-md focus:border-primary p-4 focus:outline-none"
                />
              </div>
              <div className="space-y-3">
                <span> Pausa Longa (minutes)</span>
                <Input
                  type="number"
                  name="longBreak"
                  value={tempTime.longBreak}
                  onChange={handleTempTime}
                  className="border rounded-md focus:border-primary p-4 focus:outline-none"
                />
              </div>
            </div>

            <Button variant="default" className="p-5" onClick={handleAllTime}>
              Salvar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// {
//   /* <h1>
// {isWorkTime
//   ? "Estudo"
//   : cycleCount >= cyclesBeforeLongBreak
//   ? "Pausa Longa"
//   : "Pausa"}
// </h1> */
// }

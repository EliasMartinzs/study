import { Week } from "./Week";

const DAYS_OF_WEEK = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

export function Weekly() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Timetable</h2>
      <div className="w-full h-[1px] bg-slate-500/50" />
      <div className="flex overflow-x-scroll scrollbar-custom">
        <div className="flex min-w-max  gap-6">
          {DAYS_OF_WEEK.map((dayOfWeek) => (
            <Week key={dayOfWeek} dayOfWeek={dayOfWeek} />
          ))}
        </div>
      </div>
    </div>
  );
}

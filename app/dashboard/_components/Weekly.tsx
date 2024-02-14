import { Week } from "./Week";

const DAYS_OF_WEEK = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

export function Weekly() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {DAYS_OF_WEEK.map((day, i) => (
        <Week key={i} dayOfWeek={day} />
      ))}
    </div>
  );
}

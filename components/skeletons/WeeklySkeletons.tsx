import Loading from "../reusable/Loading";
import { Skeleton } from "../ui/skeleton";

export function WeeklySkeletons() {
  return (
    <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 5 }).map((skeleton, i) => (
        <div
          key={i}
          className="w-full min-h-10 animate-pulse dark:bg-black/30 rounded-lg"
        />
      ))}
    </div>
  );
}

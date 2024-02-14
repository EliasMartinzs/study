import { Banner } from "./_components/Banner";
import { Clock } from "./_components/Clock";
import { Name } from "./_components/Name";
import { Weekly } from "./_components/Weekly";
import { UltraFoco } from "./_components/UltraFoco";
import { ModeToggle } from "../../components/settings/ModeToggle";

export default function Dashboard() {
  return (
    <main className="space-y-6 relative">
      <Banner />
      <div className="paddings md:space-y-6">
        <div className="w-full">
          <Name />
        </div>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="max-md:flex justify-center max-md:w-full">
            <Clock />
          </div>
          <div className="flex-1 w-full">
            <Weekly />
          </div>
        </div>
      </div>
      <UltraFoco />
      <ModeToggle />
    </main>
  );
}

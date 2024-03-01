import { Banner } from "./_components/Banner";
import { Clock } from "./_components/Clock";
import { Name } from "./_components/Name";
import { Weekly } from "./_components/Weekly";
import { UltraFoco } from "./_components/UltraFoco";
import { Top } from "../../components/settings/Top";

export default function Dashboard() {
  return (
    <main className="space-y-10 relative">
      <Banner />
      <div className="paddings md:space-y-10">
        <Name />
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="max-md:flex justify-center max-md:w-full">
            <Clock />
          </div>
          <div className="flex-1 w-full overflow-auto">
            <Weekly />
          </div>
        </div>
      </div>
      <Top />
    </main>
  );
}

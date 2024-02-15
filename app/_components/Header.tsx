import { ModeToggle } from "../../components/settings/ModeToggle";
import { Login } from "./Login";

export function Header() {
  return (
    <nav className="w-full h-screen flex items-center justify-center gap-x-20">
      <ModeToggle />
      <h1 className="italic text-3xl md:text-4xl lg:text-5xl xl:text-9xl font-black">
        Study
      </h1>
      <Login />
    </nav>
  );
}

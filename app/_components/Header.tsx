import { Logo } from "./Logo";
import { ModeToggle } from "../../components/settings/ModeToggle";
import { Login } from "./Login";

export function Header() {
  return (
    <nav className="w-full flex items-center justify-center h-20">
      <Logo />
      <div className="absolute right-5 space-x-4 flex items-center">
        <ModeToggle />
        <Login />
      </div>
    </nav>
  );
}

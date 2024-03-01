"use client";

import { SignOutButton } from "@clerk/clerk-react";
import { ModeToggle } from "./ModeToggle";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { UltraFoco } from "../../app/dashboard/_components/UltraFoco";

export function Top() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center gap-x-5">
      <ModeToggle />

      <SignOutButton signOutCallback={() => router.push("/")}>
        <button className="font-black text-lg flex items-center gap-x-2 justify-center">
          <LogOut /> Sair
        </button>
      </SignOutButton>

      <UltraFoco />
    </div>
  );
}

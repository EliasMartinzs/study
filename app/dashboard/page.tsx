"use client";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import React from "react";

export default function Dashboard() {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <div>
      <button onClick={() => signOut(() => router.push("/"))}>Sign out</button>
    </div>
  );
}

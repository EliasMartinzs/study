"use client";
import React from "react";
import { Banner } from "./_components/Banner";
import { SignOutButton } from "@clerk/clerk-react";

export default function Dashboard() {
  return (
    <main className="space-y-5">
      <Banner />
      <SignOutButton />
    </main>
  );
}

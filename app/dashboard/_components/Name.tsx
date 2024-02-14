"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api.js";
import { useUser } from "@clerk/clerk-react";
import useStoreUserEffect from "../../../hooks/useStoreUserEffect.ts";
import { CiEdit } from "react-icons/ci";

import { Input } from "../../../components/ui/input";
import { FormEvent, useState } from "react";
import { cn } from "../../../lib/utils";

export function Name() {
  const mutation = useMutation(api.users.updateName);
  const name = useQuery(api.users.get);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  useStoreUserEffect();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name");

    mutation({
      body: name?.toString() ?? "",
    });
  };
  return (
    <div className="flex items-center justify-start gap-x-1">
      <h2 className="text-lg xl:text-2xl italic">
        {user?.fullName === null && name === null ? "Insira seu nome" : name}
      </h2>
      <div
        className={cn(
          "w-0 border-b opacity-0 transition-all",
          isOpen && "w-48 opacity-100"
        )}
      >
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Nome!"
            className="bg-transparent border-b outline-none focus:border-purple-500"
          />
        </form>
      </div>
      <CiEdit
        className="text-xl lg:text-3xl opacity-30 hover:opacity-100 transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}

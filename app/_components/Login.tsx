"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import Loading from "../../components/reusable/Loading";

export function Login() {
  return (
    <>
      <Authenticated>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </Authenticated>
      <Unauthenticated>
        <SignInButton mode="modal">
          <p className="font-black border rounded-md cursor-pointer border-primary p-4 hover:bg-primary text-primary hover:text-background transition-colors">
            Login
          </p>
        </SignInButton>
      </Unauthenticated>
      <AuthLoading>
        <Loading />
      </AuthLoading>
    </>
  );
}

"use client";
import React from "react";
import useStoreUserEffect from "../hooks/useStoreUserEffect";

export default function Home() {
  const userId = useStoreUserEffect();
  if (userId === null) {
    return <div>Storing user...</div>;
  }
  return <div>Stored user ID: {userId}</div>;
}

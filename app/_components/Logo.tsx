"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export function Logo() {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = "/light.png";
      break;
    case "dark":
      src = "/dark.png";
      break;
    default:
      src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      break;
  }

  return (
    <>
      {resolvedTheme === "dark" ? (
        <Image
          src={`/logo-dark.png`}
          width={100}
          height={100}
          className="object-cover"
          alt="study"
        />
      ) : (
        <Image
          src={`/logo-light.png`}
          width={100}
          height={100}
          className="object-cover"
          alt="study"
        />
      )}
    </>
  );
}

"use client";
import { useMediaQuery } from "usehooks-ts";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

function DialogRoot({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer">{icon}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
}

function DrawerRoot({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  isOpen?: boolean;
}) {
  return (
    <Drawer>
      <DrawerTrigger className="cursor-pointer">{icon}</DrawerTrigger>
      <DrawerContent className="p-4">{children}</DrawerContent>
    </Drawer>
  );
}

export function Menu({
  children,
  icon,
}: {
  children?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const mobile = useMediaQuery("(max-width: 767px)");
  const desktop = useMediaQuery("(min-width: 768px)");

  if (mobile) {
    return <DrawerRoot icon={icon}>{children}</DrawerRoot>;
  }

  if (desktop) {
    return <DialogRoot icon={icon}>{children}</DialogRoot>;
  }
}

"use client";
import { SidebarItem } from "./sidebar-item";

const guestRoutes: Array<{
    icon: "Layout" | "Compass"; // Restrict icon to valid keys
    label: string;
    href: string;
  }> = [
    {
      icon: "Layout", // Match the expected type
      label: "Dashboard",
      href: "/",
    },
    {
      icon: "Compass", // Match the expected type
      label: "Browse",
      href: "/search",
    },
  ];
  

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {guestRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          iconName={route.icon} // Pass the icon name
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

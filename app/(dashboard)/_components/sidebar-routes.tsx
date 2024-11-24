"use client";
import { usePathname } from "next/navigation";
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

const teacherRoutes: Array<{
  icon: "List" | "BarChart"; // Restrict icon to valid keys
  label: string;
  href: string;
}> = [
  {
    icon: "List", // Match the expected type
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: "BarChart", // Match the expected type
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher"); //for teacher page

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
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

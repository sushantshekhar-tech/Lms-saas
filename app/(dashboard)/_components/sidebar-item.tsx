"use client";

import { cn } from "@/lib/utils";
import { Compass, Layout,List,BarChart } from "lucide-react"; // Import icons
import { usePathname, useRouter } from "next/navigation";

const iconMap = {
  Compass,
  Layout,
  List,
  BarChart 
};

type IconName = keyof typeof iconMap; // Define a type for valid keys of iconMap

interface SidebarItemProps {
  iconName: IconName; // Restrict iconName to valid keys of iconMap
  label: string;
  href: string;
}

export const SidebarItem = ({ iconName, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = iconMap[iconName]; // TypeScript now knows this is valid
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        {Icon && (
          <Icon
            size={22}
            className={cn("text-slate-500", isActive && "text-sky-700")}
          />
        )}
        {label}
      </div>
      <div className={cn(
"ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
isActive && "opacity-100"

      )}/>
    </button>
  );
};

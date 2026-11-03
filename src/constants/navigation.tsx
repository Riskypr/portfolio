import { Home, Folder, User, Mail } from "lucide-react";

export const NAV_ITEMS = [
  {
    isStatic: true,
    icon: (
      <div className="flex items-center gap-2 pr-2 h-6">
        <img
          src="/aboutMe.jpg"
          alt="Risky Prasetyo"
          className="w-8 h-8 rounded-full object-cover border border-neutral-200"
        />
        <span className="hidden sm:block text-xs font-semibold">
          Risky Prasetyo
        </span>
      </div>
    ),
    label: "Risky Prasetyo",
    href: "#home",
  },
  {
    icon: <Home className="w-3.5 h-3.5" />,
    label: "Home",
    href: "/",
  },
  {
    icon: <Folder className="w-3.5 h-3.5" />,
    label: "Projects",
    href: "projects",
  },
  {
    icon: <User className="w-3.5 h-3.5" />,
    label: "About",
    href: "#about",
  },
  {
    icon: <Mail className="w-3.5 h-3.5" />,
    label: "Contact",
    href: "#contact",
    isContact: true,
  },
];

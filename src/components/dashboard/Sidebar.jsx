import { NavLink } from "react-router";
import { LayoutDashboard, Package, ChevronLeft, ChevronRight } from "lucide-react";

// Simple class name joiner (ignores falsy values)
function mergeClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
];

export function Sidebar({ isOpen, onToggle }) {
  return (
    <div
      className={mergeClassNames(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 shadow-card",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {isOpen && (
            <h1 className="text-xl font-bold text-foreground">
              Admin Panel
            </h1>
          )}
          <button
            onClick={onToggle}
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                mergeClassNames(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <item.icon className={mergeClassNames("h-5 w-5 flex-shrink-0", isOpen ? "mr-3" : "")} />
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
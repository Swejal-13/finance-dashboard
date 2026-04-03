import { useFinanceStore } from "@/store/useFinanceStore";
import { Sun, Moon, UserCog, LayoutDashboard, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { role, setRole, toggleTheme, theme } = useFinanceStore();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold tracking-tight">FinanceHub</span>
        </div>

        <div className="hidden sm:flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <LayoutDashboard className="h-4 w-4 mr-1.5" />
            Dashboard
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <UserCog className="h-4 w-4 mr-1.5" />
                {role === "admin" ? "Admin" : "Viewer"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRole("admin")} className={role === "admin" ? "bg-accent" : ""}>
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole("viewer")} className={role === "viewer" ? "bg-accent" : ""}>
                Viewer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

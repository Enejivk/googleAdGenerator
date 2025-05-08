
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from system preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Sun size={18} className="text-yellow-500 dark:text-yellow-300" />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="bg-slate-200 dark:bg-slate-700"
      />
      <Moon size={18} className="text-indigo-800 dark:text-indigo-300" />
    </div>
  );
};

export default ThemeToggle;

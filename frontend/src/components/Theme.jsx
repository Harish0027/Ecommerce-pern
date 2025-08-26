import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants";

function ThemeSelector({ theme, setTheme }) {
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="dropdown dropdown-end">
      {/* DROPDOWN TRIGGER */}
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>

      {/* DROPDOWN MENU */}
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10"
      >
        {THEMES.map((themeOption) => (
          <button
            key={themeOption.name}
            onClick={() => handleThemeChange(themeOption.name)}
            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
              ${
                theme === themeOption.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              }`}
          >
            <PaletteIcon className="size-4" />
            <span className="text-sm font-medium">{themeOption.label}</span>
            <div className="ml-auto flex gap-1">
              {themeOption.colors.map((color, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;

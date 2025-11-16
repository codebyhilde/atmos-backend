import { LocationSearch } from "./LocationSearch";

interface HeaderProps {
    theme: "light" | "dark";
    toggleTheme: () => void;
    onSearch: (search: {
        city: string;
        country: string;
        state?: string;
    }) => void;
}

export function Header({ theme, toggleTheme, onSearch }: HeaderProps) {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex justify-between sm:justify-start items-center w-full sm:w-auto">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-sky-300 dark:to-indigo-400 sm:mr-4">
                    Atmos
                </h1>

                <button
                    className="flex-shrink-0 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    onClick={toggleTheme}
                >
                    <span>{theme === "dark" ? "🌙" : "☀️"}</span>
                </button>
            </div>

            <div className="w-full sm:w-auto sm:flex-grow sm:max-w-lg">
                <LocationSearch onSearch={onSearch} />
            </div>
        </header>
    );
}

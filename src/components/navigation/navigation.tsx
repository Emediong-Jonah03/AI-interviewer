import { useEffect, useState } from "react";
import { IoFlash, IoChatbox, IoMoon, IoClose } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { GiHamburgerMenu, GiSun } from "react-icons/gi";

const recents = [
  { message: "How to make a chatbot?" },
  { message: "What is React?" },
  { message: "What is Tailwind CSS?" },
  { message: "What is TypeScript?" },
  { message: "What is JavaScript?" },
  { message: "What is Python?" },
  { message: "What is Java?" },
  { message: "What is C++?" },
  { message: "Creating a responsive navbar" },
  { message: "Dark mode implementation" },
  { message: "State management tips" },
];

export default function Navigation() {
  const [theme, setTheme] = useState("dark"); // Default to dark mode
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Auto-open on desktop, closed on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Menu Button - Fixed at top left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-accent text-white p-2 rounded-lg shadow-lg hover:bg-accent/90 transition"
      >
        {isOpen ? (
          <IoClose className="w-6 h-6" />
        ) : (
          <GiHamburgerMenu className="w-6 h-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <nav
        className={`
          flex flex-col bg-surface fixed left-0 top-0 h-screen border-r border-border z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0
          w-4/5 sm:w-72 md:w-80 lg:w-1/5
          px-5 py-5
        `}
      >
        {/* Header */}
        <section className="flex flex-col mb-7">
          <div className="flex justify-between items-center ml-9 mb-7 gap-3">
            <div className="flex items-end gap-4 pl-10">
              <p className="text-xl font-bold truncate">AI ChatBot</p>
              <IoFlash className="w-9 h-9 bg-accent text-white p-2 rounded-lg shrink-0" />
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="bg-accent text-white px-4 py-2.5 w-full cursor-pointer rounded-lg hover:bg-accent/90 transition font-medium"
          >
            + New Chat
          </button>
        </section>

        {/* Recent Chats - scrollable */}
        <section className="flex-1 overflow-y-auto py-3 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
          <p className="text-text-muted text-xs font-semibold mb-3 tracking-wide uppercase">
            Recent Chats
          </p>

          <div className="space-y-1.5">
            {recents.map((r, index) => (
              <div
                key={index}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2.5 py-2.5 px-3 rounded-lg hover:bg-hover cursor-pointer transition group"
              >
                <IoChatbox className="w-4 h-4 text-secondary shrink-0 group-hover:text-text-muted transition" />
                <p className="text-sm truncate text-text-muted group-hover:text-text transition">
                  {r.message}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer - always at bottom */}
        <section className="border-t border-border pt-4 mt-3 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-avatar flex items-center justify-center text-sm font-bold text-gray-800">
                AT
              </div>
              <p className="font-medium truncate text-sm">Alex Tom</p>
            </div>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="hover:bg-hover p-2 rounded-lg transition shrink-0"
              title="Toggle theme"
            >
              {theme === 'light' ? <IoMoon className="w-5 h-5 text-secondary hover:text-text-muted transition" /> : <GiSun className="w-5 h-5 text-secondary hover:text-text-muted transition" />}
            </button>
          </div>

          <button className="cursor-pointer flex items-center justify-center space-x-2 text-error font-medium hover:bg-error/10 w-full py-2 rounded-lg transition">
            <GoSignOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </section>
      </nav>
    </>
  );
}

import Link from "next/link";
import useStateWithCallback from "../utils/hooks/useStateWithCallback";
import Switch from "./Switch";

const Header = () => {
  const [isDarkMode, setDarkMode] = useStateWithCallback(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!isDarkMode, (latestState) => {
      if (latestState) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    });
  };

  return (
    <header className="py-5 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="page-container flex items-center">
        <Link href="/" passHref>
          <div className="logo relative font-bold text-3xl text-center w-full cursor-pointer">
            <span>CALVIN SITE</span>
            <div
              className="element inline-block ml-2 w-2 h-2 bg-black dark:bg-white"
              style={{
                width: "10px",
                height: "10px",
                boxShadow: "0px -12px, 12px -12px, 12px 0",
              }}
            />
          </div>
        </Link>
        <div className="toggle-theme">
          <span className="text-sm font-bold bg-black text-white dark:bg-white dark:text-black w-11 block mb-1">
            DARK
          </span>
          <Switch stateSwitch={isDarkMode} onSwitch={handleToggleDarkMode} />
          <span className="text-sm font-bold bg-black text-white dark:bg-white dark:text-black w-11 block mt-1">
            MODE
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;

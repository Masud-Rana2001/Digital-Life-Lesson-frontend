import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../providers/ThemeProvider';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`btn btn-ghost btn-circle ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5" />
      ) : (
        <FiSun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;

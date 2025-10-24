import styles from "./css/Navbar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <Link to="/" onClick={closeMenu}>
            <img src="/Logo.png" alt="Logo" className={styles.logoImage} />
          </Link>
        </div>

        <div className={styles.navLinks}>
          <Link to="/about" className={styles.navLink}>
            About
          </Link>

          <Link to="/learn" className={styles.navLink}>
            Learning
          </Link>

          <Link to="/news" className={styles.navLink}>
            News
          </Link>

          <Link to="/dashboard" className={styles.navLink}>
            Trading
          </Link>
        </div>
        <div className={styles.authButtons}>
          {auth.isLoggedIn ? (
            <>
              <Link to="/dashboard" className={styles.loginButton}>
                Hi {auth.name}
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.loginButton}>
                Login
              </Link>
              <Link to="/signup" className={styles.signupButton}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center lg:hidden">
          <button
            onClick={toggleMenu}
            className={styles.menuButton}
            aria-label="Toggle menu"
            aria-expanded={isOpen} // Accessibility
          >
            {/* Simple Hamburger Icon */}
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" /> // X icon when open
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7" /> // Hamburger icon when closed
              )}
            </svg>
          </button>
        </div>

        <div
          className={` ${styles.dropdownMenu} ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"} origin-top-right transform transition-all duration-200 ease-out lg:hidden`}
          id="mobile-menu" // For aria-controls
        >
          {/* Links inside dropdown */}
          <Link to="/about" className={styles.dropdownLink} onClick={closeMenu}>
            About
          </Link>
          <Link to="/news" className={styles.dropdownLink} onClick={closeMenu}>
            News
          </Link>
          <Link to="/learn" className={styles.dropdownLink} onClick={closeMenu}>
            Learning
          </Link>
          <Link
            to="/dashboard"
            className={styles.dropdownLink}
            onClick={closeMenu}
          >
            Trading
          </Link>

          <hr className="my-2 border-t border-[rgba(111,93,231,0.2)]" />

          <div className="flex flex-col gap-3 pt-2">
            {auth.isLoggedIn ? (
              <Link
                to="/dashboard"
                className={`${styles.loginButton} w-full text-center`}
                onClick={closeMenu}
              >
                Hi {auth.name}
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${styles.loginButton} w-full text-center`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`${styles.signupButton} w-full text-center`}
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

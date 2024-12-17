import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import './Header.scss';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const menuBtn = useRef(null);
  const header = useRef(null);

  const toggleMenu = () => {
    if(window.innerWidth > 480) return;
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
        setIsActive(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={isActive ? 'layout open' : 'layout closed' } onClick={toggleMenu}></div>
      <div className={isActive ?  'burger__menu rotated' : 'burger__menu'} ref={menuBtn} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={isActive ? 'header open': 'header closed' } ref={header}>
        <div className="header__container">
          <div>
            <Link to='/characters'>
              <img
                src="https://rick-morty-lime.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-black%201.f4a3a246.png&w=48&q=75"
                alt="Logo"
              />
            </Link>
          </div>
          <ul className="nav__container">
            <li>
              <Link to="/characters" onClick={toggleMenu}>Characters</Link>
            </li>
            <li>
              <Link to="/locations" onClick={toggleMenu}>Locations</Link>
            </li>
            <li>
              <Link to="/episodes" onClick={toggleMenu}>Episodes</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;

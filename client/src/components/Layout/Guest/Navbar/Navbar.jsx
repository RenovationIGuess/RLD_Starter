import React, { useState, useRef, useEffect } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { images } from '~/constants';
import './Navbar.scss';
import { itemVariants } from '~/constants/motion';

const Navbar = ({ isLogin }) => {
  const [toggle, setToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState('');
  const [currentHoverX, setCurrentHoverX] = useState(0);
  const [currentHoverWidth, setCurrentHoverWidth] = useState(0);
  const [currentActive, setCurrentActive] = useState(null);

  const timeRef = useRef();

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 900px)');

    // Set the initial value of the 'isMobile' state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for chagnes to the meida query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const handleHovered = (e) => {
    if (timeRef.current) clearTimeout(timeRef.current);
    const firstElement = document.querySelector('.label-inner');
    const firstElementRect = firstElement.getBoundingClientRect();
    const currentHoveredElement = e.target;
    const currentElementRect = currentHoveredElement.getBoundingClientRect();
    const roundedValueWidth = Math.round(currentElementRect.width * 100) / 100;
    setCurrentHoverWidth(roundedValueWidth);
    const roundedValueX =
      Math.round((currentElementRect.left - firstElementRect.left) * 100) / 100;
    setCurrentHoverX(roundedValueX);
  };

  const handleHoveredMenu = (e, index) => {
    if (timeRef.current) clearTimeout(timeRef.current);
    const currentHoveredElement = e.target;
    const currentElementRect = currentHoveredElement.getBoundingClientRect();
    const roundedValueWidth = Math.round(currentElementRect.width * 100) / 100;
    setCurrentHoverWidth(roundedValueWidth);
    const indicatorElement = document.querySelector(
      `[data-menu=item-${index}]`
    );
    indicatorElement.classList.remove('zero-width');
  };

  const handleClicked = (e) => {
    // const clickedElement = e.currentTarget;
    // console.log(clickedElement);
    // if (currentActive && currentActive.classList.contains("active")) {
    //   currentActive.classList.remove("active");
    // }
    // setCurrentActive(clickedElement);
    // clickedElement.classList.add("active");
  };

  const handleUnhovered = () => {
    timeRef.current = setTimeout(() => {
      if (currentActive) {
        const firstElement = document.querySelector('.label-inner');
        const firstElementRect = firstElement.getBoundingClientRect();
        const currentElementRect = currentActive.getBoundingClientRect();
        const roundedValueWidth =
          Math.round(currentElementRect.width * 100) / 100;
        setCurrentHoverWidth(roundedValueWidth);
        const roundedValueX =
          Math.round((currentElementRect.left - firstElementRect.left) * 100) /
          100;
        setCurrentHoverX(roundedValueX);
      } else {
        setCurrentHoverX(0);
        setCurrentHoverWidth(0);
      }
    }, 1000);
  };

  const handleUnhoveredMenu = (index) => {
    timeRef.current = setTimeout(() => {
      if (currentActive) {
        const currentElementRect = currentActive.getBoundingClientRect();
        const roundedValueWidth =
          Math.round(currentElementRect.width * 100) / 100;
        setCurrentHoverWidth(roundedValueWidth);
        currentActive.classList.remove('zero-width');
      } else {
        setCurrentHoverWidth(0);
      }
    }, 1000);
    const indicatorElement = document.querySelector(
      `[data-menu=item-${index}]`
    );
    indicatorElement.classList.add('zero-width');
  };

  const toggleOpenNavMenu = () => {
    const navMenuElement = document.querySelector('.app__navbar-menu-bg');
    navMenuElement.classList.remove('nav__menu-hidden');
    setToggle(true);
  };

  const toggleOffNavMenu = () => {
    setTimeout(() => {
      const navMenuElement = document.querySelector('.app__navbar-menu-bg');
      navMenuElement.classList.add('nav__menu-hidden');
    }, 300);
    setToggle(false);
  };

  return (
    // Clean CSS with BEM methodlogy - find out!
    <>
      <nav className="app__navbar">
        <div className="app__navbar-container">
          <Link
            to="/nfc"
            onClick={() => {
              setActive('');
              window.scrollTo(0, 0);
            }}
            className="app__navbar-logo"
          >
            <img src={images.smwhitenfc} alt="logo" />
          </Link>
          <div
            className="app__navbar-anchors"
            style={{
              '--ind-x': currentHoverX,
              '--ind-width': currentHoverWidth,
            }}
          >
            {[
              'home',
              'product',
              'download',
              'about',
              'resources',
              'contact',
            ].map((item) => (
              <a
                key={`link-${item}`}
                className="app__navbar-anchor"
                href={`#${item}`}
                onClick={(e) => handleClicked(e)}
                onMouseOver={(e) => handleHovered(e)}
                onMouseOut={() => handleUnhovered()}
              >
                <div className="anchor__label">
                  <div className="label-inner">{item}</div>
                </div>
              </a>
            ))}
            <div className="indicator"></div>
          </div>
          {!isLogin && (
            <Link
              to="/nfc/signin"
              className="font-bold ml-1 text-base flex justify-center items-center nav__button"
            >
              Sign In
            </Link>
          )}
          <div className="app__navbar-menu-icon">
            <HiMenuAlt4 onClick={toggleOpenNavMenu} />
          </div>
        </div>
      </nav>
      <motion.div
        variants={{
          open: {
            transform: 'translateX(0%)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            transform: 'translateX(100%)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        initial={false}
        animate={toggle ? 'open' : 'closed'}
        className="app__navbar-menu-bg nav__menu-hidden"
      >
        <div className="app__navbar-menu">
          <HiX onClick={toggleOffNavMenu} />
          <div
            style={{
              '--ind-x': 0,
              '--ind-width': currentHoverWidth,
            }}
            className="app__navbar-menu-anchors"
          >
            {[
              'home',
              'product',
              'download',
              'about',
              'resources',
              'contact',
            ].map((item, index) => (
              <motion.a
                variants={{
                  open: {
                    opacity: 0.85,
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 24,
                    },
                  },
                  closed: {
                    opacity: 0,
                    y: 20,
                    transition: { duration: 0.2 },
                  },
                }}
                key={`link-${item}`}
                className="app__navbar-menu-anchor"
                href={`#${item}`}
                onClick={(e) => handleClicked(e)}
                onMouseOver={(e) => handleHoveredMenu(e, index)}
                onMouseOut={() => handleUnhoveredMenu(index)}
              >
                <div className="anchor__label">
                  <div className="label-inner">{item}</div>
                  <div
                    className="indicator zero-width"
                    data-menu={`item-${index}`}
                  ></div>
                </div>
              </motion.a>
            ))}
            <motion.div variants={itemVariants}>
              <Link
                to="/nfc/signin"
                className="font-bold text-base flex justify-center items-center nav__menu-button"
              >
                Sign In
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;

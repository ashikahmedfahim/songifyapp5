import React, { useState } from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../slices/themeSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <Container>
      <div className="-mt-2 flex justify-between items-center py-2 px-2 md:px-5 bg-blue-500 text-white select-none">
        <Link to="/" className="mx-2 text-2xl font-semibold">
          Music App
        </Link>
        <div className="flex relative">
          <Link to="/" className="mx-2 hidden md:block">
            Home
          </Link>
          <Link to="/favourite" className="mx-2 hidden md:block">
            Favourite
          </Link>
          <p className="px-3 rounded flex border-black">
            <span className="mr-2 hidden md:block"> Dark Mode</span>
            <span className="cursor-pointer">
              {darkMode ? (
                <BsToggleOn
                  size={24}
                  onClick={() => {
                    dispatch(toggleTheme());
                  }}
                />
              ) : (
                <BsToggleOff
                  size={24}
                  onClick={() => {
                    dispatch(toggleTheme());
                  }}
                />
              )}
            </span>
          </p>
          {showMenu ? (
            <RxCross2
              size={24}
              className="md:hidden"
              onClick={() => setShowMenu(!showMenu)}
            />
          ) : (
            <GiHamburgerMenu
              size={24}
              className="md:hidden"
              onClick={() => setShowMenu(!showMenu)}
            />
          )}
          {showMenu && (
            <div className={`absolute top-7 right-1 p-3 rounded z-[10] flex flex-col text-black font-semibold shadow-lg ${darkMode ? 'bg-black text-white' : 'bg-slate-100'}`}>
              <Link to="/" className="p-2 border-b-[1px]" onClick={() => setShowMenu(false)}>
                Home
              </Link>
              <Link
                to="/favourite"
                className="p-2"
                onClick={() => setShowMenu(false)}
              >
                Favourite
              </Link>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;

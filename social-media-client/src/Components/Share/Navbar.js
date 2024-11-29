import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.init";

const Navbar = ({ setSearchGet }) => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    fetch(`https://boxberry.onrender.com/carBooking/${email}`)
      .then(res => res.json())
      .then(data => setBooking(data));
  }, [booking, email]);

  const [quires, setQuires] = useState([]);

  const [id, setMId] = useState('');
  // console.log(id)
  useEffect(() => {
    fetch('http://localhost:5000/quires')
      .then(res => res.json())
      .then(data => setQuires(data));
  }, [quires]);

  const handleSearch = e => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter cards based on search query
    const filtered = quires.filter(car => {
      // Check if the car has a 'name' property before using toLowerCase()
      return car.description && car.description.toLowerCase().includes(query.toLowerCase());
    });

    setSearchGet(filtered);
  };

  const menuItems = <></>;
  return (
    <div className="  navbar bg-gray-900   text-white border-b-[1px] border-slate-700">
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black "
          >
            {menuItems}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost normal-case font-bold lg:text-3xl  sm:text-sm text-amber-500 ml-5"
        >
          <img
            className="h-12 mr-2 rounded-full"
            src="https://seeklogo.com/images/S/superman-logo-E555F48FD9-seeklogo.com.png"
            alt=""
          />
          Social Media
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex lg:pr-28 ml-40">
        {user && (
          <div className="ml-12">
            <input
              value={searchQuery}
              onChange={handleSearch}
              placeholder="🔍 Search Post"
              className="bg-slate-700 w-[550px] pl-3 p-[5px] rounded-lg text-slate-100"
              type="text"
              name=""
              id=""
            />
          </div>
        )}

        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      {/* Image */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end  mr-5">
            <ul className="flex gap-5 items-center">
              {user?.email === 'abc@def.com' && (
                <li className="font-bold text-slate-400 hover:text-orange-400">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}

              <li className=" ">
                <button className="  text-amber-500" onClick={logout}>
                  SignOut
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="mr-5">
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;

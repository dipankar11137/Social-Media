import React, { useState } from 'react';
import {
  BsArrowUpRightCircleFill,
  BsStopwatch,
} from 'react-icons/bs';
import {
  FaBookmark,
  FaChevronCircleDown,
  FaDeezer,
  FaUserFriends,
} from 'react-icons/fa';
import { FaLandmarkFlag } from 'react-icons/fa6';
import { FcFeedIn } from 'react-icons/fc';
import { GoHome } from 'react-icons/go';
import { MdEvent, MdGroups, MdOndemandVideo } from 'react-icons/md';


const LeftSide = ({ handleHome }) => {
  const [button, setButton] = useState('');
  const [tropics, setTropics] = useState(false);
  const [resources, setResources] = useState(false);

  return (
    <div className="text-slate-300">
      <div>
        <div>
          <div
            onClick={() => setButton('button1')}
            className={`${
              button === 'button1' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer mb-2`}
          >
            <button
              onClick={handleHome}
              className="flex gap-2 items-center  pl-2 "
            >
              <GoHome className="text-xl text-slate-100" />
              Home
            </button>
          </div>
          <div
            onClick={() => setButton('button2')}
            className={`${
              button === 'button2' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer`}
          >
            <button className="flex gap-2 items-center  pl-2 ">
              <BsArrowUpRightCircleFill className="text-xl text-slate-100" />
              Name
            </button>
          </div>
          <div
            onClick={() => setButton('button3')}
            className={`${
              button === 'button3' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer`}
          >
            <button className="flex gap-2 items-center  pl-2 ">
              <FaUserFriends className="text-xl text-blue-400" />
              Friend
            </button>
          </div>
          <div
            onClick={() => setButton('button4')}
            className={`${
              button === 'button4' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer`}
          >
            <button className="flex gap-2 items-center  pl-2 ">
              <BsStopwatch className="text-xl text-blue-400 " />
              Memories
            </button>
          </div>
          <div
            onClick={() => setButton('button5')}
            className={`${
              button === 'button5' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer`}
          >
            <button className="flex gap-2 items-center  pl-2 ">
              <FaBookmark className="text-xl text-fuchsia-500" />
              Save
            </button>
          </div>
          <div
            onClick={() => setButton('button6')}
            className={`${
              button === 'button6' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer`}
          >
            <button className="flex gap-2 items-center  pl-2 ">
              <MdGroups className="text-xl text-slate-100 bg-blue-500 rounded-full p-[2px]" />
              Groups
            </button>
          </div>
          <div
            onClick={() => setButton('button7')}
            className={`${
              button === 'button7' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer`}
          >
            <button className="flex gap-2 items-center  pl-2 ">
              <MdOndemandVideo className="text-xl text-slate-100 " />
              Videos
            </button>
          </div>
          <div
            onClick={() => setButton('button8')}
            className={`${
              button === 'button8' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer`}
          >
            <button className="flex gap-2 items-center  pl-2 ">
              <FaLandmarkFlag className="text-xl text-blue-400" />
              Marketplace
            </button>
          </div>
          <div
            onClick={() => setButton('button9')}
            className={`${
              button === 'button9' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer`}
          >
            <button className="flex gap-2 items-center  pl-2 ">
              <FcFeedIn className="text-xl text-slate-100" />
              Feeds
            </button>
          </div>
          <div
            onClick={() => setButton('button150')}
            className={`${
              button === 'button150' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer`}
          >
            <button className="flex gap-2 items-center  pl-2 ">
              <MdEvent className="text-xl text-orange-500" />
              Events
            </button>
          </div>
          <div
            onClick={() => setButton('button5')}
            className={`${
              button === 'button5' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer`}
          >
            <button className="flex gap-2 items-center  pl-2 ">
              <FaDeezer className="text-xl text-slate-100" />
              Ads Manager
            </button>
          </div>
          <div
            onClick={() => setButton('button11')}
            className={`${
              button === 'button11' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer`}
          >
            <button className="flex gap-2 items-center  pl-2 ">
              <FaChevronCircleDown className="text-xl text-slate-500 " />
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
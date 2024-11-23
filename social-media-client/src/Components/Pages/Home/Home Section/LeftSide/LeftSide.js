import React, { useState } from 'react';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import { GoHome } from 'react-icons/go';


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
              <BsArrowUpRightCircleFill className="text-xl text-slate-100" />
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
              <BsArrowUpRightCircleFill className="text-xl text-slate-100" />
              Popular
            </button>
          </div>
          <div
            onClick={() => setButton('button5')}
            className={`${
              button === 'button5' ? 'bg-slate-800' : 'hover:bg-slate-800 '
            } w-[180px] p-2 rounded-lg cursor-pointer`}
          >
            <button className="flex gap-2 items-center  pl-2 ">
              <BsArrowUpRightCircleFill className="text-xl text-slate-100" />
              Popular
            </button>
          </div>
        </div>
       
    
       
      </div>
    </div>
  );
};

export default LeftSide;
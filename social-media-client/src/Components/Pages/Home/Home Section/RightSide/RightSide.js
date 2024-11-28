import React from 'react';
import Contact from './Contact';
import FriendRequest from './FriendRequest';
import Sponsored from './Sponsored';

const RightSide = () => {
  return (
    <div className='md:pl-16'>
      <Sponsored />
      <div className='w-full h-[1px]  bg-slate-500 my-4'></div>
      <FriendRequest />
      <Contact/>
    </div>
  );
};

export default RightSide;
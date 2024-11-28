import React from 'react';

const FriendRequest = () => {
  return (
    <div>
      <div className="flex justify-between text-slate-300 mb-3">
        <h1>Friend Requested</h1>
        <h1 className="font-thin  cursor-pointer text-blue-300">See All</h1>
      </div>
      <div className="flex gap-3">
        <div>
          <img
            className="h-12 w-12 rounded-full"
            src="https://media.istockphoto.com/id/1391534246/photo/portrait-of-happy-indian-girl-in-desert-village-india.jpg?s=612x612&w=0&k=20&c=GhDY8SveqC2FWbeZSFo8kzjad0zdonitdiUcfiq_lXY="
            alt=""
          />
        </div>
        <div className="mt-[1px]">
          <div className='flex justify-between'>
            <div>
            
              <h1>Jasika Sabnam</h1>
              <p className="text-sm text-slate-400">3 mutual friend</p>
            </div>
            <div className="text-sm text-slate-400">1h</div>
          </div>
          <div className="flex justify-between gap-5 mt-3">
            <button className="btn btn-primary btn-sm">Confirm</button>
            <button className="btn btn-neutral btn-sm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
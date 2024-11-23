import React, { useEffect, useState } from 'react';
import Inquire from './Inquire';

const Inquires = () => {
    const [opinions, setOpinion] = useState([]);
    useEffect(() => {
      fetch(`http://localhost:5000/inquire`)
        .then(res => res.json())
        .then(data => setOpinion(data));
    }, [opinions]);
  return (
    <div className="md:mx-10 mx-1 mt-5">
      <h1 className="text-center text-4xl font-bold my-3 text-slate-300">
        Customer Opinions
      </h1>
      <div className="grid grid-cols-12 text-center text-sm md:text-3xl font-semibold text-indigo-200">
        <div className="col-span-3 border-[1px] border-r-0 border-indigo-600 px-4 py-2 ">
          <h1>Name</h1>
        </div>
        <div className="col-span-4 md:col-span-3 border-[1px] border-r-0 border-indigo-600 px-4 py-2 ">
          <h1>Email</h1>
        </div>
        <div className="col-span-5 md:col-span-6 border-[1px]  border-indigo-600 px-4 py-2 ">
          <h1>Opinion</h1>
        </div>
      </div>
      {opinions
        .slice()
        .reverse()
        .map((opinion, index) => (
          <Inquire key={opinion._id} opinion={opinion} index={index + 1} />
        ))}
    </div>
  );
};

export default Inquires;
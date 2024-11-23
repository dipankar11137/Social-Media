import React from 'react';

const Inquire = ({ opinion, index }) => {
  return (
    <div className="grid grid-cols-12 text-start text-xs md:text-lg overflow-auto ">
      <div className="col-span-3 border-[1px] border-t-0 border-r-0 border-indigo-700 px-1 md:px-4  py-2 ">
        <h1>
          <span className="font-semibold mr-2">{index}.</span>{' '}
          {opinion?.data?.name}
        </h1>
      </div>
      <div className="col-span-4 md:col-span-3 border-[1px] border-r-0 border-t-0 border-indigo-700 px-1 md:px-4 py-2 ">
        <h1> {opinion?.data?.email}</h1>
      </div>
      <div className="col-span-5 md:col-span-6 border-[1px] border-t-0 border-indigo-700 px-1 md:px-4  py-2 ">
        <h1> {opinion?.data?.opinion}</h1>
      </div>
    </div>
  );
};

export default Inquire;
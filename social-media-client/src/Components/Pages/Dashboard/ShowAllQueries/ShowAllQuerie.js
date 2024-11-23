import React from 'react';

const ShowAllQuerie = ({ post, index, handleDelete }) => {
  return (
    <div className="grid grid-cols-12 text-start text-xs md:text-lg overflow-auto ">
      <div className="col-span-2 border-[1px] border-t-0 border-r-0 border-indigo-400 px-1 md:px-4  py-2 flex justify-center items-center text-2xl">
        <h1>{index}</h1>
      </div>
      <div className="col-span-4 md:col-span-3 border-[1px] border-r-0 border-t-0 border-indigo-400 px-1 md:px-4 py-2 ">
        <h1> {post?.name}</h1>
      </div>
      <div className="col-span-3 md:col-span-6 border-[1px] border-t-0 border-r-0 border-indigo-400 px-1 md:px-4  py-2 ">
        <h1> {post?.description}</h1>
      </div>
      <div className="col-span-2 md:col-span-1 border-[1px] border-t-0 border-indigo-400   py-2  pt-3 md:pt-10 ">
        <button
          onClick={() => handleDelete(post?._id)}
          className="w-14 md:w-20 h-10"
        >
          <img
            src="https://app.tryzulu.com/assets/static/images/delete-gif-dark-mode.gif"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default ShowAllQuerie;
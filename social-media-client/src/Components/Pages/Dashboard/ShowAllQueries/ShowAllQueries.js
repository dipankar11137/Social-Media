import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ShowAllQuerie from './ShowAllQuerie';

const ShowAllQueries = () => {
  const [posts, setPost] = useState([0])
  
  useEffect(() => {
    fetch('http://localhost:5000/quires')
      .then(res => res.json())
      .then(data => setPost(data));
  }, [posts])
    const handleDelete = id => {
      const proceed = window.confirm('Are You Sure ?');
      if (proceed) {
        const url = `http://localhost:5000/quire/${id}`;
        fetch(url, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            const remaining = posts.filter(product => product._id !== id);
            setPost(remaining);
            toast.success('Successfully Delete');
          });
      }
    };
  return (
    <div className="w-[320px] md:w-[1000px] lg:w-[1200px] pb-20">
      {/* show */}
      <div className="m-2 md:mx-10">
        <h1 className="text-center text-4xl uppercase font-bold my-4 text-slate-500">
          Happy Queries{' '}
        </h1>
        <div className="grid grid-cols-12 text-center text-xs md:text-2xl font-semibold text-indigo-200">
          <div className="col-span-2 border-[1px] border-r-0 border-indigo-400 px-4 py-2 ">
            <h1>Index</h1>
          </div>
          <div className="col-span-4 md:col-span-3 border-[1px] border-r-0 border-indigo-400 px-4 py-2 ">
            <h1>Name</h1>
          </div>
          <div className="col-span-3 md:col-span-6 border-[1px] border-r-0 border-indigo-400 md:px-4 py-2 ">
            <h1>Queries</h1>
          </div>
          <div className="col-span-2 md:col-span-1 border-[1px]  border-indigo-400  py-2 ">
            <h1>Delete</h1>
          </div>
        </div>
        {posts
          .slice()
          .reverse()
          .map((post, index) => (
            <ShowAllQuerie
              key={post._id}
              post={post}
              index={index + 1}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default ShowAllQueries;
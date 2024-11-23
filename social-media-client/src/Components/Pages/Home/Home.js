import React, { useEffect, useState } from 'react';
import { BsFillQuestionSquareFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import AddPost from './AddPost/AddPost';
import HomeSections from './Home Section/HomeSections';
import InquireFrom from './Home Section/InquireFrom/InquireFrom';
import LeftSide from './Home Section/LeftSide/LeftSide';
import RightSide from './Home Section/RightSide/RightSide';


const Home = ({ searchGet }) => {
   const [opinion, setOpinion] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleHome = () => {
      window.scrollTo(0, 0);
  }
  return (
    <div className="pt-[66px] text-white">
      
      <div className="grid grid-cols-12">
        <div className="col-span-2 border-r-[1px] border-slate-700 ">
          <div className="fixed mt-5 ml-5">
            <LeftSide handleHome={handleHome} />
          </div>
        </div>
        <div className="col-span-7">
          <AddPost />
          <HomeSections searchGet={searchGet} />
        </div>
        <div className="col-span-3  border-slate-700">
          <div className="fixed mt-5 mx-5">
            <RightSide />
          </div>
        </div>
      </div>

      <div className="fixed z-50 right-5 bottom-10 ">
        {opinion && (
          <div className="bg-green-600 mr-7 p-3 rounded-t-lg rounded-l-lg ">
            <InquireFrom setOpinion={setOpinion} />
          </div>
        )}
        <h1 className=" text-4xl text-green-500 flex justify-end cursor-pointer">
          {opinion ? (
            <BsFillQuestionSquareFill
              className="rotate-180 text-red-600 "
              onClick={() => setOpinion(false)}
            />
          ) : (
            <BsFillQuestionSquareFill onClick={() => setOpinion(true)} />
          )}
        </h1>
      </div>
    </div>
  );
};

export default Home;

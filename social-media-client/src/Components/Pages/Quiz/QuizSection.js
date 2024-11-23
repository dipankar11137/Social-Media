import React, { useState } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { MdOutlineCreditScore } from 'react-icons/md';
import QUiz2 from './QUiz2';
import Quiz from './Quiz';
import Quiz3 from './Quiz3';
import Scores from './Score/Scores';

const QuizSection = () => {
  const [button, setButton] = useState('quiz1')
  
 
  return (
    <div className="pt-16">
      <div className="grid grid-cols-12 ">
        <div className="col-span-2 border-r-[1px] border-slate-600 p-10 h-screen">
          <div>
            <button
              onClick={() => setButton('quiz1')}
              className={`${
                button === 'quiz1' ? 'bg-slate-700 ' : ''
              }flex gap-3 items-center hover:bg-slate-700 w-40 text-start p-2 rounded-lg text-lg font-semibold`}
            >
              <FaRegQuestionCircle className="text-white" />
              Quiz 1
            </button>
          </div>
          <div>
            <button
              onClick={() => setButton('quiz2')}
              className={`${
                button === 'quiz2' ? 'bg-slate-700 ' : ''
              }flex gap-3 items-center hover:bg-slate-700 w-40 text-start p-2 rounded-lg text-lg font-semibold mt-5`}
            >
              <FaRegQuestionCircle className="text-white" />
              Quiz 2
            </button>
          </div>
          <div>
            <button
              onClick={() => setButton('quiz3')}
              className={`${
                button === 'quiz3' ? 'bg-slate-700 ' : ''
              }flex gap-3 items-center hover:bg-slate-700 w-40 text-start p-2 rounded-lg text-lg font-semibold mt-5`}
            >
              <FaRegQuestionCircle className="text-white" />
              Quiz 3
            </button>
          </div>
          <div className="border-t-[1px] border-slate-500  mt-5">
            <button
              onClick={() => setButton('score')}
              className={`${
                button === 'score' ? 'bg-slate-700 ' : ''
              }flex gap-3 items-center hover:bg-slate-700 w-40 text-start p-2 rounded-lg text-lg font-semibold mt-2 text-green-400`}
            >
              <MdOutlineCreditScore className="text-green-300" />
              Score
            </button>
          </div>
        </div>
        <div className="col-span-10">
          {button === 'quiz1' && <Quiz />}
          {button === 'quiz2' && <QUiz2 />}
          {button === 'quiz3' && <Quiz3 />}
          {button === 'score' && <Scores />}
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';
import Score from './Score';

const Scores = () => {
  const [results, setResult] = useState([])
    const [user] = useAuthState(auth);
 
    useEffect(() => {
      fetch(`http://localhost:5000/solve`)
        .then(res => res.json())
        .then(data => {
          const sortedResults = data.sort((a, b) => b.percent - a.percent);
          setResult(sortedResults);
        });
    }, [results]);
  
  const handleRemove = (id) => {
     const proceed = window.confirm('Are You Sure ?');
     if (proceed) {
       const url = `http://localhost:5000/solveDelete/${id}`;
       fetch(url, {
         method: 'DELETE',
       })
         .then(res => res.json())
         .then(data => {
           const remaining = results.filter(product => product._id !== id);
           setResult(remaining);
           toast.success('Remove Successfully ');
         });
     }
  }
  return (
    <div className="pt-7 pb-10">
      <div>
        <div>
          <h1 className="mb-5 text-4xl text-center font-semibold uppercase text-green-400">
            Ranking
          </h1>
        </div>
        <div className="overflow-x-auto mx-7 overflow-y-scroll h-[500px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
          <table className="table table-xs text-center w-full">
            <thead>
              <tr className="border-[1px] border-slate-500">
                <th></th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Question</th>
                <th>High Score</th>
                <th>Percent</th>
                {user?.email === 'nahid@gmail.com' && <th>Remove</th>}
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <Score
                  key={result?._id}
                  result={result}
                  index={index + 1}
                  user={user}
                  handleRemove={handleRemove}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Scores;
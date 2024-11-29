import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoDotFill } from 'react-icons/go';
import { auth } from '../../../../../firebase.init';

const Comment = ({ comment, setRId, handleCommentRemove }) => {
  const [time, setTime] = useState(0);
   const [users] = useAuthState(auth);
  // console.log(comment);
  useEffect(() => {
    const currentTime = new Date();
    const previousTime = new Date(comment?.time); // Example previous time

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(currentTime - previousTime);

    // Convert difference to minutes, hours, and days
    let differenceMinutes = Math.floor(differenceMs / (1000 * 60));
    let differenceHours = Math.floor(differenceMinutes / 60);
    let differenceDays = Math.floor(differenceHours / 24);
    let differenceMonth = Math.floor(differenceDays / 30);

    // Handle crossing 60 minutes to hours
    differenceMinutes %= 60;

    // Set the time based on the largest non-zero unit
    if (differenceMonth > 0) {
      setTime(`${differenceMonth} month`);
    } else if (differenceDays > 0) {
      setTime(`${differenceDays} days`);
    } else if (differenceHours > 0) {
      setTime(`${differenceHours} hours`);
    } else {
      setTime(`${differenceMinutes} minutes`);
    }
  }, [comment]);
  return (
    <div className="mb-4">
      {/* remove modal */}
      {users?.email === comment?.email && (
        <div className="flex justify-end -mb-5">
          <div>
            <label
              onClick={() => setRId(comment._id)}
              htmlFor="remove-comment"
              className="text-xl hover:cursor-pointer"
            >
              ...
            </label>

            {/* Put this part before </body> tag */}
            <input
              type="checkbox"
              id="remove-comment"
              className="modal-toggle"
            />
            <div className="modal" role="dialog">
              {/* <div className="modal-box"> */}
              <div className="bg-slate-800 p-5 rounded-xl w-28">
                <div className="flex justify-end -mt-5 -mr-5 ">
                  <label
                    htmlFor="remove-comment"
                    className="bg-slate-600 px-2 rounded-full cursor-pointer"
                  >
                    x
                  </label>
                </div>

                <button
                  onClick={handleCommentRemove}
                  className="btn btn-xs btn-secondary"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-end ">
        <img className="h-6 w-6 rounded-full" src={comment?.img} alt="" />
        <div className="flex items-center">
          <h1 className="ml-3 font-semibold text-md text-indigo-400">
            {comment?.name}{' '}
          </h1>
          <h2 className="ml-5 text-xs text-slate-400 flex items-center gap-1">
            <GoDotFill className="text-green-500" />
            {time} ago
          </h2>
        </div>
      </div>

      <div className="mt-1 font-normal  text-[13px]">
        <h1 className="ml-10">{comment?.comment}</h1>
      </div>
    </div>
  );
};

export default Comment;
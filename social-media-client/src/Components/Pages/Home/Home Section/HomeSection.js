import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaArrowAltCircleLeft, FaCommentAlt, FaShare } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { WhatsappShareButton } from 'react-share';
import { toast } from 'react-toastify';
import { auth } from '../../../../firebase.init';
import Comments from './Comments/Comments';
import './Scroll.css';

const HomeSection = ({ quire, handleRemove, setMId }) => {
   const [users] = useAuthState(auth);
  const [comment, setComment] = useState(false);
  const [remove, setRemove] = useState(false);
  const [time, setTime] = useState(0);
  const [comments, setComments] = useState([]);
  const [rId, setRId] = useState('')
  const url = 'http://localhost:3000/';
  const title='hello'

  // console.log(users)
  useEffect(() => {
    fetch(`http://localhost:5000/comment/${quire?._id}`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [comments, quire?._id]);

  const handleCommentRemove = () => {
     const proceed = window.confirm('Are You Sure ?');
     if (proceed) {
       const url = `http://localhost:5000/commentRemove/${rId}`;
       fetch(url, {
         method: 'DELETE',
       })
         .then(res => res.json())
         .then(data => {
           const remaining = comments.filter(product => product._id !== rId);
           setComment(remaining);
           toast.success('Remove Successfully ');
         });
     }
  }

  useEffect(() => {
    const currentTime = new Date();
    const previousTime = new Date(quire?.pTime); // Example previous time

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
  }, [quire]);


  return (
    <div className="border-b-[1px] border-slate-600 pb-2 mb-3">
      <div className="  ">
        <div className="hover:bg-slate-800 px-2   hover:cursor-pointer  rounded-xl">
          <div className="flex items-end ">
            {comment && (
              <button
                onClick={() => setComment(false)}
                className="text-3xl mr-3 mb-1"
              >
                <FaArrowAltCircleLeft />
              </button>
            )}
            <div className="flex justify-between  w-full ">
              <div className="flex items-end ">
                <img
                  className="h-10 w-10 rounded-full"
                  src={quire?.img}
                  alt=""
                />
                <div className="flex items-center">
                  <h1 className="ml-3 font-semibold text-indigo-300">
                    {quire?.name}{' '}
                  </h1>
                  <h2 className="ml-5 text-xs text-slate-400 flex items-center gap-1">
                    <GoDotFill className="text-green-600" />
                    {time} ago
                  </h2>
                </div>
              </div>
              {/* remove modal */}
              {users?.email === quire?.email && (
                <div>
                  <label
                    onClick={() => setMId(quire._id)}
                    htmlFor="remove-modal"
                    className="text-xl hover:cursor-pointer"
                  >
                    ...
                  </label>

                  {/* Put this part before </body> tag */}
                  <input
                    type="checkbox"
                    id="remove-modal"
                    className="modal-toggle "
                  />
                  <div className="modal" role="dialog">
                    {/* <div className="modal-box"> */}
                    <div className="bg-slate-800 p-5 rounded-xl w-28">
                      <div className="flex justify-end -mt-5 -mr-5 ">
                        <label
                          htmlFor="remove-modal"
                          className="bg-slate-600 px-2 rounded-full cursor-pointer"
                        >
                          x
                        </label>
                      </div>

                      <button
                        onClick={handleRemove}
                        className="btn btn-xs btn-secondary"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 font-normal  text-lg">
            <h1 className='ml-1'>{quire?.description}</h1>
            {quire?.image && (
              <img
                className="w-full h-[350px] mt-2"
                src={quire?.image}
                alt=""
              />
            )}
          </div>

          <div className="mt-4 pb-2 flex items-center ">
            <button
              onClick={() => setComment(prevComment => !prevComment)}
              className="ml-2 bg-slate-800 hover:bg-slate-900 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <FaCommentAlt /> {comments.length}
            </button>
            <WhatsappShareButton url={url} title={title}>
              <button className="ml-2 bg-slate-800 hover:bg-slate-900 px-3 py-1 rounded-full flex items-center gap-2">
                <FaShare /> Share
              </button>
            </WhatsappShareButton>
          </div>
        </div>

        {comment && <div className="w-72 h-[1px] bg-slate-700 mt-1"></div>}
        {/* comment */}
        {comment && (
          <Comments
            quire={quire}
            comments={comments}
            setRId={setRId}
            handleCommentRemove={handleCommentRemove}
          />
        )}
      </div>
    </div>
  );
};

export default HomeSection;
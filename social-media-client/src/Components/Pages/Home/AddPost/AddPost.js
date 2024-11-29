import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../firebase.init';
import useUser from '../../../hooks/useUser';
import PostCart from './PostCart';

const AddPost = () => {
  const [users] = useAuthState(auth);
  const { user } = useUser()
  const navigator=useNavigate()

  const handleClick = () => {
  navigator('/login')
}

  return (
    <div>
      {users ? (
        <div>
          <label htmlFor="my_modal_6" className="">
            <div className="bg-slate-800 m-2 p-2 rounded-lg hover:cursor-pointer">
              <div className="flex items-center gap-3">
                <img
                  className="h-12 w-12 rounded-full"
                  src={user?.img}
                  alt=""
                />
                <h1 className="w-full bg-slate-600 rounded-xl pl-2 py-1 text-slate-300">
                  What's on your mind , {user?.name} ?
                </h1>
              </div>
              <div className="mt-3 pb-1 flex justify-between mx-20">
                <div className="flex items-end gap-1">
                  <img
                    className="h-6 w-8"
                    src="https://pngimg.com/d/question_mark_PNG128.png"
                    alt=""
                  />
                  <h1>Queries / Doubt</h1>
                </div>
                <div className="flex items-end gap-1">
                  <img
                    className="h-6 w"
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png?_nc_eui2=AeG1xCg32b7FWHVC8g2NUytnPL4YoeGsw5I8vhih4azDkqbAzgM-c07omE01n3-Yd6GAIb3tRCdKcVncSqWwtR5d"
                    alt=""
                  />
                  <h1>Photo</h1>
                </div>
                <div className="flex items-end gap-1">
                  <img
                    className="h-6 w "
                    src="https://cdn-icons-png.flaticon.com/512/8899/8899643.png"
                    alt=""
                  />
                  <h1>Solution / Fixed</h1>
                </div>
              </div>
            </div>
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <PostCart user={user} />
          </div>
        </div>
      ) : (
        <div>
          <div onClick={handleClick} className="bg-slate-800 m-2 p-2 rounded-lg hover:cursor-pointer">
            <div className="flex items-center gap-3">
              <img
                className="h-12 w-12 rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/1154/1154462.png"
                alt=""
              />
              <h1 className="w-full bg-slate-600 rounded-xl pl-2 py-1 text-slate-300">
                What's on your mind , {user?.name} ?
              </h1>
            </div>
            <div className="mt-3 pb-1 flex justify-between mx-20">
              <div className="flex items-end gap-1">
                <img
                  className="h-6 w-8"
                  src="https://pngimg.com/d/question_mark_PNG128.png"
                  alt=""
                />
                <h1>Queries / Doubt</h1>
              </div>
              <div className="flex items-end gap-1">
                <img
                  className="h-6 w"
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png?_nc_eui2=AeG1xCg32b7FWHVC8g2NUytnPL4YoeGsw5I8vhih4azDkqbAzgM-c07omE01n3-Yd6GAIb3tRCdKcVncSqWwtR5d"
                  alt=""
                />
                <h1>Photo</h1>
              </div>
              <div className="flex items-end gap-1">
                <img
                  className="h-6 w "
                  src="https://cdn-icons-png.flaticon.com/512/8899/8899643.png"
                  alt=""
                />
                <h1>Solution / Fixed</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
import React from 'react';
import { useForm } from 'react-hook-form';

const PostCart = ({user}) => {
  const imageHostKey = '39899c0cdbfbe66a2dbde3818a91832c';

  const currentDate = new Date();

  // Get the current year, month, date, hours, minutes, and seconds
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const date = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  // Format the current time
  const formattedTime = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}`;

  // 
   const {
     register,
     formState: { errors },
     handleSubmit,
     reset,
   } = useForm();
  const onSubmit = (data) => {
    if (data.img[0]) {
  const image = data.img[0];
  const formData = new FormData();
  formData.append('image', image);
  const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(imageData => {
      const image = imageData.data.url;
      const updateUrl = {
        ...data,
        name: user?.name,
        img: user?.img,
        email: user?.email,
        image,
        pTime: formattedTime,
      };

      // console.log('aci',updateUrl);
      fetch(`http://localhost:5000/quires`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updateUrl),
      })
        .then(res => res.json())
        .then(data => {
          reset();
        });
    });
    } else {
       const updateUrl = {
         ...data,
         name: user?.name,
         img: user?.img,
         email: user?.email,
         pTime: formattedTime,
       };

      //  console.log('nai',updateUrl);
       fetch(`http://localhost:5000/quires`, {
         method: 'POST',
         headers: {
           'content-type': 'application/json',
         },
         body: JSON.stringify(updateUrl),
       })
         .then(res => res.json())
         .then(data => {
           reset();
         });
}

  }
  return (
    <div className="modal-box">
      <div className="modal-action fixed right-0 -top-6">
        <label
          htmlFor="my_modal_6"
          className="bg-slate-700 px-3 py-1 rounded-full cursor-pointer"
        >
          x
        </label>
      </div>
      <div>
        <h1 className="text-center -mt-3 font-semibold border-b-[1px] pb-2 border-slate-600">
          Create Post
        </h1>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Quires / Question</span>
            </label>
            <textarea
              type="text"
              placeholder="Write yours quires"
              className="input input-bordered bg-slate-600 w-full  pt-1 h-32 text-slate-100"
              {...register('description', {})}
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              placeholder="Image"
              className="input input-bordered bg-slate-600 w-full pt-1"
              {...register('img', {
               
               
              })}
            />
           
          </div>

          <input
            className="btn btn-primary w-full text-white mt-3"
            type="submit"
            value="Post"
          />
        </form>
      </div>
    </div>
  );
};

export default PostCart;
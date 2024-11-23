import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const InquireFrom = ({ setOpinion }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = data => {
    fetch(`http://localhost:5000/inquire`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Thanks for your Inquire');
        setOpinion(false);
        reset();
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white text-xl">
              Please Give Your Opinion
            </span>
          </label>
          <div>
            <textarea
              type="text"
              placeholder="Which type of quiz you want"
              className="input input-bordered  w-full max-w-xs pt-1 h-20"
              {...register('opinion', {
                required: {
                  value: true,
                  message: 'Opinion is Required',
                },
              })}
            />
            <label className="label">
              {errors.opinion?.type === 'required' && (
                <span className="label-text-alt text-red-500">
                  {errors.opinion.message}
                </span>
              )}
            </label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered  w-full max-w-xs"
              {...register('name', {
                required: {
                  value: true,
                  message: 'Name is Required',
                },
              })}
            />
            <label className="label">
              {errors.name?.type === 'required' && (
                <span className="label-text-alt text-red-500">
                  {errors.name.message}
                </span>
              )}
            </label>
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered  w-full max-w-xs"
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is Required',
                },
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Provide a valid Email',
                },
              })}
            />
            <label className="label">
              {errors.email?.type === 'required' && (
                <span className="label-text-alt text-red-500">
                  {errors.email.message}
                </span>
              )}
              {errors.email?.type === 'pattern' && (
                <span className="label-text-alt text-red-500">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>
          <input
            className="btn btn-primary w-full text-white"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default InquireFrom;


import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase.init';
import useUser from '../../hooks/useUser';

const EditProfile = () => {
  const { user } = useUser();
  const [users] = useAuthState(auth);
  const email = users?.email;
  const navigate=useNavigate()

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(true);
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [bio, setBio] = useState('');
  const [workplace, setWorkplace] = useState('');

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const handleChange = () => {
    const changeUrl = {
      name: name || user.name,
      img: img || user.img,
      bio: bio || user.bio,
      workplace: workplace || user.workplace,
      email,
    };

    //  console.log(changeUrl);
    fetch(`http://localhost:5000/create-user/${email}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(changeUrl),
    })
      .then(res => res.json())
      .then(data => {
        navigate('/profile');
      });
}
  return (
    <div className="min-h-screen bg-gray-700 p-5 mt-[66px]">
      {/* Cover Photo Section */}
      <div className="relative w-full h-56 bg-gray-200 rounded-lg overflow-hidden">
        {coverImage ? (
          <img
            src="https://timelinecovers.pro/facebook-cover/download/anime-your-lie-in-april-watching-stars-facebook-cover.jpg"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Add a cover photo
          </div>
        )}
        <label className="absolute bottom-2 right-2 bg-gray-800 text-white text-sm px-3 py-1 rounded cursor-pointer hover:bg-gray-700">
          Change Cover
          <input
            type="file"
            className="hidden"
            onChange={e => handleImageChange(e, setCoverImage)}
          />
        </label>
      </div>

      {/* Profile Picture Section */}
      <div className="relative flex justify-center -mt-14">
        <div className="relative">
          <div className="w-28 h-28 bg-gray-300 rounded-full overflow-hidden border-4 border-white shadow-md">
            {user?.img ? (
              <img
                src={user?.img}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Add Photo
              </div>
            )}
          </div>
          <label className="absolute bottom-2 right-2 bg-gray-800 text-white text-sm px-2 py-1 rounded-full cursor-pointer hover:bg-gray-700">
            <input
              type="file"
              className="hidden"
              onChange={e => handleImageChange(e, setProfileImage)}
            />
            ✏️
          </label>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="mt-8 bg-slate-600 shadow-md rounded-lg p-5 space-y-5">
        {/* Name Edit */}
        <div>
          <label className="block text-gray-200 font-semibold mb-1">Name</label>
          <input
            type="text"
            placeholder={user?.name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        {/* img Edit */}
        <div>
          <label className="block text-gray-200 font-semibold mb-1">
            Image
          </label>
          <input
            type="text"
            placeholder={user?.img}
            onChange={e => setImg(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Bio Edit */}
        <div>
          <label className="block text-gray-200 font-semibold mb-1">Bio</label>
          <textarea
            placeholder={user?.bio || bio}
            onChange={e => setBio(e.target.value)}
            rows="3"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Workplace */}
        <div>
          <label className="block text-gray-200 font-semibold mb-1">
            Workplace
          </label>
          <input
            type="text"
            placeholder={user?.workplace || workplace}
            onChange={e => setWorkplace(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Save Changes Button */}
        <button
          onClick={handleChange}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-bold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;



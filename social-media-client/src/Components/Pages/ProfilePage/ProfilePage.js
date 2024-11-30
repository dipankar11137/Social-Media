import React from 'react';
import usePersonPost from '../../hooks/usePersonPost';
import useUser from '../../hooks/useUser';
import HomeSection from '../Home/Home Section/HomeSection';

const ProfilePage = () => {
  const { user } = useUser()
  const [myPosts] = usePersonPost()
  // console.log('dado',myPosts)
  return (
    <div className="bg-gray-900 text-white min-h-screen pt-[66px]">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <img
          className="w-full h-64 object-cover"
          src="https://timelinecovers.pro/facebook-cover/download/anime-your-lie-in-april-watching-stars-facebook-cover.jpg" // Replace with cover image URL
          alt="Cover"
        />
        {/* Profile Picture and Details */}
        <div className="absolute bottom-0 left-6 flex items-center space-x-4 pb-2">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full border-4 border-gray-900 "
              src={user?.img} // Replace with profile image URL
              alt="Profile"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <div className="flex space-x-2 mt-2">
              <button className="bg-blue-600 px-4 py-2 rounded">
                Add Story
              </button>
              <button className="bg-gray-700 px-4 py-2 rounded">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex space-x-4 mt-6">
        {/* Left Sidebar */}
        <div className="w-1/4">
          {/* Intro Section */}
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold mb-2">Intro</h2>
            <p>Studied at Dhaka University, Dhaka</p>
            <p>Single</p>
            <p>Followed by 1,522 people</p>
          </div>

          {/* Photos Section */}
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold mb-2">Photos</h2>
            <div className="grid grid-cols-3 gap-2">
              {myPosts.slice().reverse().map((post, index) => (
                <div key={index}>
                  <img
                    className="w-full h-20 object-cover rounded"
                    src={
                      post?.image ||
                      (index % 2 === 1
                        ? 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
                        : 'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg')
                    }
                    alt={post?.name || 'Default Image'}
                  />
                </div>
              ))}

             
            </div>
          </div>

          {/* Friends Section */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Friends</h2>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center">
                <img
                  className="w-16 h-16 rounded-full"
                  src="https://static.toiimg.com/thumb/msid-115055853,width-400,resizemode-4/115055853.jpg"
                  alt="Friend"
                />
                <p className="text-sm mt-1">Elon Musk</p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="w-16 h-16 rounded-full"
                  src="https://s.france24.com/media/display/451ed2b8-eed6-11ea-afdd-005056bf87d6/w:1280/p:16x9/messi-1805.jpg"
                  alt="Friend"
                />
                <p className="text-sm mt-1">Leo Messi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Posts Section */}
        <div className="w-2/4">
          {/* Post Tabs */}
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <div className="flex justify-between">
              <button className="text-blue-400">Posts</button>
              <button>About</button>
              <button>Friends</button>
            </div>
          </div>

          {/* Posts */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Posts</h2>
            {/* Single Post */}
            {myPosts
              .slice()
              .reverse()
              .map(quire => (
                <HomeSection quire={quire} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

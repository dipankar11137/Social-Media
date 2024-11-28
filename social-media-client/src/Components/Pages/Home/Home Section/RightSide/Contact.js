import React from 'react';

const Contact = () => {
  const users = [
    {
      id: 4,
      name: 'Jerin Munia',
      image:
        'https://i.pinimg.com/564x/5a/7b/c9/5a7bc9ee8614eef19ae0caf54f24af30.jpg',
      online: true,
    },
    {
      id: 2,
      name: 'Toma Akther',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGpxhad2kpJzsEe0TwBEPJr1XAuArmnUOznA&s',
      online: false,
    },
    {
      id: 3,
      name: 'Munia Akther',
      image: 'https://photosbook.in/wp-content/uploads/real-girl-pic54.jpg',
      online: true,
    },

    {
      id: 5,
      name: 'Lamia Akther',
      image:
        'https://i.pinimg.com/736x/4d/d5/96/4dd5961aae2eb1c265299d4e1a27212f.jpg',
      online: true,
    },
    {
      id: 1,
      name: 'Jasika Sabnam',
      image:
        'https://media.istockphoto.com/id/1391534246/photo/portrait-of-happy-indian-girl-in-desert-village-india.jpg?s=612x612&w=0&k=20&c=GhDY8SveqC2FWbeZSFo8kzjad0zdonitdiUcfiq_lXY=',
      online: true,
    },
  ];
  return (
    <div>
      <div className="flex justify-between text-slate-400">
        <h1>Contact</h1>
        <p className="font-bold">...</p>
      </div>

      <div className="p-2 pl-0    h-[240px]">
        {users.map(user => (
          <div
            key={user.id}
            className="flex items-center space-x-3 p-2 hover:bg-gray-800 text-white rounded-lg cursor-pointer mt-1"
          >
            {/* Profile Image */}
            <div className="relative">
              <img
                className="w-8 h-8 rounded-full"
                src={user.image}
                alt="Profile"
              />
              {/* Green/Gray Online Dot */}
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                  user.online ? 'bg-green-500' : 'bg-gray-500'
                }`}
              ></span>
            </div>

            {/* Name Section */}
            <div>
              <p className="text-slate-200">{user.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
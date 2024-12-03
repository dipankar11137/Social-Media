import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../../../firebase.init';

const Contact = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messageHistory, setMessageHistory] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState('');

   const messagesEndRef = useRef(null);

   // Scroll to the last message
   useEffect(() => {
     if (messagesEndRef.current) {
       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
     }
   }, [messageHistory, receiverId]);

  // Fetch users list
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [users]);

  // Fetch messages using useEffect
  useEffect(() => {
    if (email && receiverId) {
      fetch(
        `http://localhost:5000/messages?userId=${email}&selectedUserId=${receiverId}`
      )
        .then(res => res.json())
        .then(data => {
          console.log('Fetched messages:', data); // Debug fetched messages
          setMessageHistory(prevHistory => ({
            ...prevHistory,
            [receiverId]: data, // Store messages for the selected user
          }));
        })
        .catch(error => console.error('Error fetching messages:', error));
    }
  }, [email, receiverId]); // Dependency array ensures it runs when email or receiverId changes

  const openChat = user => {
    setSelectedUser(user);
    setReceiverId(user.email); // Set the receiverId to the selected user's email
    setIsModalOpen(true);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedUser) {
      fetch('http://localhost:5000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: email,
          receiverId,
          text: messageInput,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.acknowledged) {
            setMessageInput('');
            // Refetch messages after sending
            fetch(
              `http://localhost:5000/messages?userId=${email}&selectedUserId=${receiverId}`
            )
              .then(res => res.json())
              .then(data => {
                setMessageHistory(prevHistory => ({
                  ...prevHistory,
                  [receiverId]: data,
                }));
              });
          }
        })
        .catch(error => console.error('Error sending message:', error));
    }
  };
// console.log(selectedUser);
  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      {/* Contact List */}
      <h1 className="text-lg font-bold mb-4 text-slate-400">Contacts</h1>
      <div className="grid grid-cols-1 gap-4">
        {users
          .filter(u => u.email !== email)
          .map(user => (
            <div
              key={user._id} // Replace _id with the unique key in your data
              className="flex items-center space-x-3 p-1 rounded-lg cursor-pointer hover:bg-gray-700"
              onClick={() => openChat(user)}
            >
              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full"
                  src={user?.img}
                  alt="Profile"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                    user.online ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                ></span>
              </div>
              <div>
                <p className="text-white font-bold">{user.name}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg">
            {/* Header */}
            <div className="flex items-center p-4 bg-gray-900 rounded-t-lg">
              <img
                src={selectedUser?.img}
                alt="Selected User"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4">
                <h2 className="text-white font-bold">{selectedUser?.name}</h2>
                <p className="text-sm text-gray-400">
                  {selectedUser.online ? 'Online' : 'Offline'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-auto text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-3 overflow-y-auto max-h-64">
              {(messageHistory[receiverId] || []).map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    msg.senderId === email ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <div>
                        {msg.senderId === email ? null : (
                          <img
                            className="h-6 rounded-full w-6"
                            src={selectedUser.img}
                            alt=""
                          />
                        )}
                      </div>
                      <div
                        className={`p-2 rounded-lg max-w-xs ${
                          msg.senderId === email
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-end mt-1">
                        {msg.senderId === email ? 'You' : ''}
                      </p>
                      <p className="text-xs text-end mt-1 text-gray-400">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Invisible div to scroll to the bottom */}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 bg-gray-900 rounded-b-lg">
              <div className="flex items-center">
                <input
                  type="text"
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;

// import React, { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../../../../../firebase.init';

// const Contact = () => {
//   const [user] = useAuthState(auth);
//   const email = user?.email;
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messageInput, setMessageInput] = useState('');
//   const [messageHistory, setMessageHistory] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [receiverId,setReceiverId]=useState('')

// useEffect(() => {
//   fetch(`http://localhost:5000/users`)
//     .then(res => res.json())
//     .then(data => {
//       console.log('Logged-in user email:', email);
//       console.log('Fetched users:', data);

//       const isUserIncluded = data.some(u => u.email === email);
//       if (!isUserIncluded) {
//         console.error('Logged-in user is not in the users list!');
//       }

//       setUsers(data);
//     });
// }, [email]);

// const fetchMessages = userId => {
//   fetch(
//     `http://localhost:5000/messages?userId=${email}&selectedUserId=${receiverId}`
//   )
//     .then(res => res.json())
//     .then(data => {
//       console.log('Fetched messages:', data); // Debug fetched messages
//       setMessageHistory(prevHistory => ({
//         ...prevHistory,
//         [userId]: data, // Store messages for the selected user
//       }));
//     })
//     .catch(error => console.error('Error fetching messages:', error));
// };

//   const openChat = user => {
//     setSelectedUser(user);
//     fetchMessages(user.id); // Fetch messages for the selected user
//     setIsModalOpen(true);
//    setReceiverId(user?.email)
//   };

//  const handleSendMessage = () => {
//    if (messageInput.trim() && selectedUser) {
//      fetch('http://localhost:5000/messages', {
//        method: 'POST',
//        headers: {
//          'Content-Type': 'application/json',
//        },
//        body: JSON.stringify({
//          senderId: email,
//          receiverId,
//          text: messageInput,
//        }),
//      })
//        .then(res => res.json())
//        .then(data => {
//          if (data.acknowledged) {
//            setMessageInput('');
//            fetchMessages(selectedUser.id);
//          }

//        })
//        .catch(error => console.error('Error:', error));
//    }
//  };

//   return (
//     <div className="p-4 bg-gray-900 text-white min-h-screen">
//       {/* Contact List */}
//       <h1 className="text-lg font-bold mb-4 text-slate-400">Contacts</h1>
//       <div className="grid grid-cols-1 gap-4">
//         {users
//           .filter(u => u.email !== email) // Exclude the logged-in user if needed
//           .map(user => (
//             <div
//               key={user._id} // Ensure `_id` or another unique key is used
//               className="flex items-center space-x-3 p-1 rounded-lg cursor-pointer hover:bg-gray-700"
//               onClick={() => openChat(user)}
//             >
//               <div className="relative">
//                 <img
//                   className="w-10 h-10 rounded-full"
//                   src={user?.img || '/default-avatar.png'} // Fallback for missing images
//                   alt="Profile"
//                 />
//                 <span
//                   className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
//                     user.online ? 'bg-green-500' : 'bg-gray-500'
//                   }`}
//                 ></span>
//               </div>
//               <div>
//                 <p className="text-white font-bold">
//                   {user.name || 'Anonymous'}
//                 </p>
//               </div>
//             </div>
//           ))}
//       </div>

//       {/* Modal */}
//       {isModalOpen && selectedUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg">
//             {/* Header */}
//             <div className="flex items-center p-4 bg-gray-900 rounded-t-lg">
//               <img
//                 src={selectedUser?.img}
//                 alt="Selected User"
//                 className="w-10 h-10 rounded-full"
//               />
//               <div className="ml-4">
//                 <h2 className="text-white font-bold">{selectedUser?.name}</h2>
//                 <p className="text-sm text-gray-400">
//                   {selectedUser.online ? 'Online' : 'Offline'}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="ml-auto text-gray-400 hover:text-white"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Chat Messages */}
//             <div className="p-4 overflow-y-auto max-h-64">
//               {(messageHistory[selectedUser.id] || []).map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`mb-2 flex ${
//                     msg.senderId === email ? 'justify-end' : 'justify-start'
//                   }`}
//                 >
//                   <div
//                     className={`p-2 rounded-lg max-w-xs ${
//                       msg.senderId === email
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-700 text-white'
//                     }`}
//                   >
//                     <p className="text-sm">{msg.text}</p>
//                     <p className="text-xs mt-1 text-end">
//                       {msg.senderId === email ? 'You' : selectedUser.name}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Message Input */}
//             <div className="p-4 bg-gray-900 rounded-b-lg">
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   value={messageInput}
//                   onChange={e => setMessageInput(e.target.value)}
//                   placeholder="Type a message..."
//                   className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Contact;

// import React from 'react';

// const Contact = () => {
//   const users = [
//     {
//       id: 4,
//       name: 'Jerin Munia',
//       image:
//         'https://i.pinimg.com/564x/5a/7b/c9/5a7bc9ee8614eef19ae0caf54f24af30.jpg',
//       online: true,
//     },
//     {
//       id: 2,
//       name: 'Toma Akther',
//       image:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGpxhad2kpJzsEe0TwBEPJr1XAuArmnUOznA&s',
//       online: false,
//     },
//     {
//       id: 3,
//       name: 'Munia Akther',
//       image: 'https://photosbook.in/wp-content/uploads/real-girl-pic54.jpg',
//       online: true,
//     },

//     {
//       id: 5,
//       name: 'Lamia Akther',
//       image:
//         'https://i.pinimg.com/736x/4d/d5/96/4dd5961aae2eb1c265299d4e1a27212f.jpg',
//       online: true,
//     },
//     {
//       id: 1,
//       name: 'Jasika Sabnam',
//       image:
//         'https://media.istockphoto.com/id/1391534246/photo/portrait-of-happy-indian-girl-in-desert-village-india.jpg?s=612x612&w=0&k=20&c=GhDY8SveqC2FWbeZSFo8kzjad0zdonitdiUcfiq_lXY=',
//       online: true,
//     },
//   ];
//   return (
//     <div>
//       <div className="flex justify-between text-slate-400">
//         <h1>Contact</h1>
//         <p className="font-bold">...</p>
//       </div>

//       <div className="p-2 pl-0    h-[240px]">
//         {users.map(user => (
//           <div
//             key={user.id}
//             className="flex items-center space-x-3 p-2 hover:bg-gray-800 text-white rounded-lg cursor-pointer mt-1"
//           >
//             {/* Profile Image */}
//             <div className="relative">
//               <img
//                 className="w-8 h-8 rounded-full"
//                 src={user.image}
//                 alt="Profile"
//               />
//               {/* Green/Gray Online Dot */}
//               <span
//                 className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
//                   user.online ? 'bg-green-500' : 'bg-gray-500'
//                 }`}
//               ></span>
//             </div>

//             {/* Name Section */}
//             <div>
//               <p className="text-slate-200">{user.name}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../../../firebase.init';
import useUser from '../../../../hooks/useUser';

const Contact = () => {
  const [userEmail] = useAuthState(auth);
  const email = userEmail?.email;
  const {user}=useUser()
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
            <div className="flex items-center py-2 px-4  bg-primary rounded-t-lg">
              <img
                src={selectedUser?.img}
                alt="Selected User"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4">
                <h2 className="text-white font-bold">{selectedUser?.name}</h2>
                <p className="text-sm text-gray-300">
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
              {(messageHistory[receiverId] || []).map((msg, index, array) => {
                const isLastMessage = index === array.length - 1;

                return (
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
                              src={selectedUser?.img}
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
                          title={new Date(msg.timestamp).toLocaleString([], {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          })}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      </div>
                      {isLastMessage && (
                        <div className="mt-2">
                          <div className="flex justify-end">
                            {msg.senderId === email ? (
                              <img
                                className="w-4 h-4 rounded-full"
                                src={user?.img}
                                alt=""
                              />
                            ) : null}
                          </div>
                          <p className="text-xs text-end mt-1 text-gray-400">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
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


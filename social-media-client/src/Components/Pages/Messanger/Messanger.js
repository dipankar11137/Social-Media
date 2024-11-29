// components/Chat.js
import { signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../firebase.init';
// import { auth, db } from '../firebase';

const Messenger = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  }, []);

  const handleSend = async e => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      uid: auth.currentUser.uid,
      timestamp: new Date(),
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
    });

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl">Messenger</h1>
        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-700">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-center mb-4 ${
              msg.uid === auth.currentUser.uid ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className="flex items-center">
              <img
                src={msg.photoURL}
                alt="Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="bg-white p-2 rounded shadow">
                <p className="text-sm font-bold">{msg.displayName}</p>
                <p>{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-4 bg-gray-200 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          className="flex-1 p-2 rounded border"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Messenger;

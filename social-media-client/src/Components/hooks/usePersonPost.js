import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';

const usePersonPost = () => {
  const [users] = useAuthState(auth);
  const [myPosts, setMyPost] = useState([])
  
     useEffect(() => {
       fetch(`http://localhost:5000/post/${users?.email}`)
         .then(res => res.json())
         .then(data => setMyPost(data));
     }, [myPosts, users?.email]);
     return [ myPosts ];
  
};

export default usePersonPost;



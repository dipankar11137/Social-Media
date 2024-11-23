import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import HomeSection from './HomeSection';

const HomeSections = ({ searchGet }) => {
  const [quires, setQuires] = useState([]);

  const [id, setMId] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/quires')
      .then(res => res.json())
      .then(data => setQuires(data));
  }, [quires]);



  const handleRemove = () => {
    const proceed = window.confirm('Are You Sure ?');
    if (proceed) {
      const url = `http://localhost:5000/quire/${id}`;
      fetch(url, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          const remaining = quires.filter(product => product._id !== id);
          setQuires(remaining);
          toast.success('Remove Successfully ');
        });
    }
  };
  return (
    <div className="pt-1 px-3 text-slate-300">
      <div>
        {searchGet.length > 0 ? (
          <>
            {searchGet
              .slice()
              .reverse()
              .map(quire => (
                <HomeSection
                  key={quire._id}
                  quire={quire}
                  handleRemove={handleRemove}
                  setMId={setMId}
                />
              ))}
          </>
        ) : (
          <>
            {quires
              .slice()
              .reverse()
              .map(quire => (
                <HomeSection
                  key={quire._id}
                  quire={quire}
                  handleRemove={handleRemove}
                  setMId={setMId}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeSections;
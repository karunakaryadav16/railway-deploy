import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ token }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3027/home', { headers: { Authorization: `Bearer ${token}` } });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Failed to fetch data:', error.response.data.message);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div>
      <h2>Home</h2>
      <p>{message}</p>
    </div>
  );
};

export default Home;

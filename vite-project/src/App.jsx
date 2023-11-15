import React, { useState } from 'react';
import Registration from './Registration';
import Login from './Login';
import Home from './Home';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <div>
      {!token ? (
        <div>
          <Registration />
          <Login setToken={setToken} />
        </div>
      ) : (
        <Home token={token} />
      )}
    </div>
  );
};

export default App;

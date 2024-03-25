import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const SessionContext = React.createContext();

function SessionProvider(props) {
  const [session, setSession] = useState();
  const shouldFetch = typeof window !== 'undefined' && localStorage.getItem('token');

  useEffect(() => {
    async function decodeJWT(token) {
      try {
        if (token) {
          const decoded = jwt.decode(token);
          return setSession(decoded);
        } else {
          return setSession('unlogged');
        }
      } catch (error) {
        console.error('Error decoding JWT:', error);
        return setSession('unlogged');
      }
    }

    if (shouldFetch) {
      const token = localStorage.getItem('token');
      decodeJWT(token);
    }
  }, [shouldFetch]); // Use the simpler variable in the dependency array

  return (
    <SessionContext.Provider value={{ session }}>
      {props.children}
    </SessionContext.Provider>
  );
}

export { SessionProvider, SessionContext };

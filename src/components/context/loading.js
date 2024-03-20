// LoadContext.js
import React, { createContext, useState } from 'react';

export const LoadContext = createContext();

export const LoadProvider = ({ children }) => {
  const [load, setLoad] = useState(false); // Remplacez false par la valeur par défaut appropriée

  return <LoadContext.Provider value={{ load, setLoad }}>{children}</LoadContext.Provider>;
};

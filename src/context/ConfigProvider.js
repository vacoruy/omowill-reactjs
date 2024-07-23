import React, { createContext, useState, useEffect } from 'react';

const ConfigContext = createContext({
  tabIdx: 0,
  changeTabIdx: () => {},  
});

const ConfigProvider = ({ children }) => {
  const [tabIdx, setSelTabIdx] = useState(0);

  const changeTabIdx = (selTabIdx) => {
    setSelTabIdx(selTabIdx);
  };

  useEffect(() => {}, [tabIdx]); 

  return (
    <ConfigContext.Provider value={{ tabIdx, changeTabIdx }}>
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigProvider };

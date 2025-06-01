
import React, { createContext, useContext, useState } from 'react';

interface TTSContextType {
  ttsEnabled: boolean;
  toggleTTS: () => void;
}

const TTSContext = createContext<TTSContextType | undefined>(undefined);

export const TTSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ttsEnabled, setTTSEnabled] = useState(true);

  const toggleTTS = () => setTTSEnabled((prev) => !prev);

  return (
    <TTSContext.Provider value={{ ttsEnabled, toggleTTS }}>
      {children}
    </TTSContext.Provider>
  );
};

export const useTTSContext = (): TTSContextType => {
  const context = useContext(TTSContext);
  if (!context) throw new Error("useTTSContext debe usarse dentro de TTSProvider");
  return context;
};

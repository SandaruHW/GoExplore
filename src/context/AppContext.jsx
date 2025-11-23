import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [user, setUser] = useState({
    firstName: 'Tiya',
    lastName: 'Seneviratne',
    email: 'tiya.seneviratne@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  });

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });
    return () => sub.remove();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        darkMode,
        toggleDarkMode,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

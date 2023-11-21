import { useEffect, useState } from 'react';

const useTheme = (): string => {
  const [themeValue, setThemeValue] = useState("");

  useEffect(() => {
    setThemeValue('dark');
    //setThemeValue(document.documentElement.classList.contains('dark') ? 'dark');
  }, []);

  return themeValue;
};

export default useTheme;

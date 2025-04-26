import {create} from 'zustand';

const useThemeStore = create((set) => ({
  darkMode: localStorage.getItem("theme") === "dark",  // Retrieve from localStorage initially
  toggleDarkMode: () => {
    set((state: any) => {
      const newMode = !state.darkMode;
      localStorage.setItem("theme", newMode ? "dark" : "light"); // Save to localStorage
      document.documentElement.classList.toggle("dark", newMode); // Apply to the document
      return { darkMode: newMode };
    });
  },
}));

export default useThemeStore;

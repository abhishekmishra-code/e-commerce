// // src/contexts/ThemeContext.jsx
// import { createContext, useContext, useEffect, useState } from 'react'

// const ThemeContext = createContext()

// export function ThemeProvider({ children }) {
//   const [darkMode, setDarkMode] = useState(() => {
//     // Check localStorage first
//     const savedTheme = localStorage.getItem('theme')
//     if (savedTheme) {
//       return savedTheme === 'dark'
//     }
//     // Fall back to system preference
//     return window.matchMedia('(prefers-color-scheme: dark)').matches
//   })

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark')
//       localStorage.setItem('theme', 'dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//       localStorage.setItem('theme', 'light')
//     }
//   }, [darkMode])

//   const toggleDarkMode = () => setDarkMode(prev => !prev)

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </ThemeContext.Provider>
//   )
// }

// export const useTheme = () => useContext(ThemeContext)
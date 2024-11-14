import { useState, useEffect, useContext, createContext } from "react";

// Create a context to hold the fetched data
const DataContext = createContext();
// Create a custom hook to consume the context
export const useData = () => useContext(DataContext);

// Create a provider component to wrap your application and provide the data
export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          `https://script.google.com/macros/s/AKfycbwcOVWW74NrboxcyYUY4nYXao39VpfTqdLQQLfIN2kQ9EQ423RC803ckZtPDTiijyEbCQ/exec`
        );
        const data = await response.json();
        const posts = data.filter((obj) => obj.Listing === `y`);
        setPosts(posts);
        setLoader(false);
      } catch (error) {
        setLoader(false);
      }
    }

    load();
  }, []);

  return (
    <DataContext.Provider value={{ posts, loader }}>
      {children}
    </DataContext.Provider>
  );
};

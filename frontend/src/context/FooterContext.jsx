import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const FooterContext = createContext();

export const FooterProvider = ({ children }) => {
  const [footer, setFooter] = useState(null);

  const API = "http://localhost:5000/api/footer";

  const fetchFooter = async () => {
    const res = await axios.get(API);
    setFooter(res.data);
  };

  const updateFooter = async (data) => {
    const res = await axios.put(API, data);
    setFooter(res.data.footer);
    return true;
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  return (
    <FooterContext.Provider value={{ footer, updateFooter }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooter = () => useContext(FooterContext);

import { Container, createMuiTheme, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket])


  const newTheme = createTheme({
    palette: {
      primary: {
        light: '#DBA747',
        main: '#d29219',
        dark: '#936611',
        contrastText: '0 0 0 0.87',
      },
      secondary: {
        light: '#F73378',
        main: '#F50057',
        dark: '#AB003C',
        contrastText: '#FFFFFF',
      },
    },
  });
  


  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      ...newTheme.palette,
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}  />
      {loading ? <LoadingComponent message="Initializing app..." /> 
        : location.pathname === '/' ? <HomePage />
        : <Container sx={{mt: 4}}>
            <Outlet />
          </Container>
      }
      
    </ThemeProvider>
  );
}

export default App;

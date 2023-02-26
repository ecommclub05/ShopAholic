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
  const location = useLocation();   // get the location
  const {setBasket} = useStoreContext();    // get the setBasket function from the context
  const [loading, setLoading] = useState(true);   // loading state

  useEffect(() => {                         // on mount
    const buyerId = getCookie('buyerId');   // get the buyerId cookie
    if (buyerId) {                      // if the buyerId exists
      agent.Basket.get()                // get the basket
        .then(basket => setBasket(basket))  // set the basket
        .catch(error => console.log(error)) // log any errors
        .finally(() => setLoading(false));  // set loading to false
    } else {                        // if the buyerId does not exist
      setLoading(false);            // set loading to false
    }
  }, [setBasket])                  // run this effect when the setBasket function changes


  const newTheme = createTheme({    // create a new theme
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

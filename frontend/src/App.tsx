import './App.css';
import { Box, Container, createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { Filter, Search, GameCards, Header, Sort } from "./components";
import { ResetButton } from './components/resetbutton/ResetButton';
import { Provider } from "mobx-react";
import { defaultContext } from "./store";
import { ApolloProvider } from '@apollo/client';
import { client } from './util';
import { useEffect, useState } from 'react';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const val = localStorage.getItem("dark-mode")
    if(val === "true"){
      setDarkMode(true)
    }
  }, [])
  

  const theme = responsiveFontSizes(createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#283044",
      },
      secondary: {
        main: "#EB5160",
      },
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Provider {...defaultContext}>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
            <Container maxWidth='md' disableGutters>
              <Box sx={{margin: 2}}>
                <Search/>
                <Filter/>
                <Sort/>
              </Box>
              <GameCards/>
            </Container>
          </Box>
      </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#666'
    }
  }
});


export default function App() {
  const [todayWon, setTodayWon] = useState(0);
  const [todayLost, setTodayLost] = useState(0);
  const [won, setWon] = useState(0);
  const [lost, setLost] = useState(0);

  const [history, setHistory] = useState([]);

  const handleWon = () => {
    setHistory([...history, 1]);
    if (won >= 4) {
      setWon(0);
      setLost(0);
    } else {
      setWon(won + 1);
    }
    setTodayWon(todayWon + 1);
  }
  const handleLost = () => {
    setHistory([...history, 0]);
    if (lost >= 14) {
      setWon(0);
      setLost(0);
    } else {
      setLost(lost + 1);
    }
    setTodayLost(todayLost + 1);
  }
  const handleUndo = () => {
    if (history.length === 0) {
      return;
    }
    const last = history[history.length - 1];
    if (last === 1) {
      setTodayWon(todayWon - 1);
    } else {
      setTodayLost(todayLost - 1);
    }
    setHistory(history.slice(0, history.length - 1));
  }

  return (
    <>
      <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{justifyContent: "center", textAlign: "center"}}>
        <Box sx={{ backgroundColor:"black", color:'white', height:150, display:"grid", placeContent: "center"}} >
          <Typography variant="h3" sx={{ fontWeight: "bold"}}>本日：{todayWon}W{todayLost}L</Typography>
          <Typography variant="h3" sx={{ fontWeight: "bold"}}>{won}/5 W {lost}/15 L</Typography>
        </Box>
        <Box sx={{ height: 100 }} />
        <Grid container spacing={2} justifyContent="center">
          <Grid xs={6}>
            <Button
              variant="contained"
              color='success'
              sx={{width:"80%"}}
              onClick={() => { handleWon(); }}
            >
              Won
            </Button>
          </Grid>
          <Grid xs={6}>
          <Button
              variant="contained"
              color='secondary'
              sx={{width:"80%"}}
              onClick={() => { handleLost(); }}
            >
              Lost
            </Button>
          </Grid>
          <Grid xs={6}>
          <Button
              variant="contained"
              color='error'
              sx={{width:"80%"}}
              onClick={() => { handleUndo(); }}
            >
              Undo
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <TextField
              value={won}
              onChange={(e) => { setWon(e.target.value); }}
            ></TextField>
          </Grid>
          <Grid xs={6}>
            <TextField
              value={lost}
              onChange={(e) => { setLost(e.target.value); }}
            ></TextField>
          </Grid>
        </Grid>
      </Container>
      </ThemeProvider>
    </>
  );
}

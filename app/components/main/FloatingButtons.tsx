import React from 'react';
import { Fab, Zoom, Box, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChatIcon from '@mui/icons-material/Chat';
import helpIcon from 'app/components/res/floatButton/helpButton.png';

const BackToTop: React.FC = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={true}>
      <Fab
        color="primary"
        size="large"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '65px',
          zIndex: 1200, 
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

const HelpButton: React.FC = () => {
  const handleClick = () => {
    console.log('Help button clicked! Implement chat modal here.');
  };

  return (
    <Zoom in={true}>
      <Fab
        onClick={handleClick}

        sx={{
          elevation: 0,
          boxShadow: 'none',
          backgroundColor: 'transparent',
          position: 'fixed',
          bottom: '90px', 
          right: '20px',
          zIndex: 1200,
          width: '150px',
          height: '150px',
          padding: '8px',
        }}
      >
        <img src={helpIcon} alt="Help" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Fab>
    </Zoom>
  );
};

const FloatingButtons: React.FC = () => {
  return (
    <Box>
      <HelpButton />
      <BackToTop />
    </Box>
  );
};

export default FloatingButtons;
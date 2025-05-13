import React from 'react';
import Box from '@mui/material/Box';
import logoImage from './res/PNS_LOGO.png';
import { useNavigate } from 'react-router-dom'; 

export default function Logo() {
  const navigate = useNavigate();

  return (
    <Box
      component="button"
      onClick={() => navigate('/')}
      sx={{
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <Box
        component="img"
        src={logoImage} 
        alt="Logo"
        sx={{
          width: { xs: '120px', sm: '150px', md: '190px' },
          height: { xs: '40px', sm: '50px', md: '68px' },
          objectFit: "contain",
        }}
      />
    </Box>
  );
}
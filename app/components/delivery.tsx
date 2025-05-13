import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DeliveryWrapper = styled(Box)(({ theme }) => ({
  height: "5vh",
  backgroundColor: "#033B8E",
  borderRadius: theme.shape.borderRadius * 3,
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
}));

const DeliveryContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
});

export default function Delivery() {
  return (
    <DeliveryWrapper>
      <DeliveryContent>
        <LocalShippingIcon sx={{ color: 'white', marginRight: '8px', fontSize: '1.5rem' }} />
        <Typography fontSize='0.75rem' sx={{ color: 'white', marginRight: '8px' }}>
          Home Delivery
        </Typography>
        <ExpandMoreIcon sx={{ color: 'white', fontSize: '1.25rem' }} />
        <Typography
          fontSize={{ xs: '0.75rem', sm: '0.875rem', md: '0.875rem', lg: '0.875rem' }}
          sx={{ 
            color: 'white', 
            marginRight: { xs: '4px', sm: '8px', md: '8px', lg: '8px' },
            borderLeft: '0.15rem solid white',
            paddingLeft: { xs: '4px', sm: '8px', md: '8px', lg: '8px' },
            whiteSpace: 'nowrap',
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }
          }}
        >
          ★ Spend upon $350 can enjoy{' '}
          <Typography 
            component="span" 
            fontSize={{ xs: '0.75rem', sm: '0.875rem', md: '0.875rem', lg: '0.875rem' }} 
            sx={{ 
              fontWeight: 'bold',
              whiteSpace: 'nowrap'
            }}
          >
            FREE delivery
          </Typography>
        </Typography>
      </DeliveryContent>
    </DeliveryWrapper>
  );
}
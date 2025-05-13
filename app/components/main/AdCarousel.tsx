import React from 'react';
import { Box, styled, useTheme } from '@mui/material';
import MuiCarousel from './MuiCarousel';
  

import ad1 from '../res/carousel/1.avif'; 
import ad2 from '../res/carousel/2.avif'; 
import ad3 from '../res/carousel/3.avif'; 
import ad4 from '../res/carousel/4.avif'; 
import ad5 from '../res/carousel/5.avif';

const ad = [
  { text: 'ad1', image: ad1 },
  { text: 'ad2', image: ad2 },
  { text: 'ad3', image: ad3 },
  { text: 'ad4', image: ad4 },
  { text: 'ad5', image: ad5 },
];

const StyledBox = styled(Box)({
  display: 'flex',
  padding: 5,
  height: '50vh',
  borderRadius: 1,
  overflow: 'hidden',
});

const AdCarousel: React.FC = () => {
  const theme = useTheme();

  return (
    <MuiCarousel
      slidesToShow={{
        mobile: 1,
        tablet: 3,
        desktop: 3
      }}
      slidesToScroll={1}
      dots={true}
      autoplay={true}
      autoplaySpeed={2000}
      infinite={true}
      highlightMode = {true}
      style={{
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
      }}
    >
      {ad.map((item, index) => (
        <StyledBox key={index}>
          <img
            src={item.image}
            alt={item.text}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 16,
            }}
          />
        </StyledBox>
      ))}
    </MuiCarousel>
  );
};

export default AdCarousel;

import React from 'react';
import { Box, Typography, styled, useTheme } from '@mui/material';
import CaseDeals from '../res/smallCatIcon/case-deals.webp'; 
import NewArrival from '../res/smallCatIcon/new-arrival.webp';
import WeeklyAds from '../res/smallCatIcon/weekly-ads.webp';
import Buy1Get1 from '../res/smallCatIcon/buy-1-get-1.webp';
import Clearance from '../res/smallCatIcon/clearance.webp';
import Meadows from '../res/smallCatIcon/meadows.webp';
import MuiCarousel from './MuiCarousel';

const CategoriesSection: React.FC = () => {
  const theme = useTheme();
  const categories = [
    { text: 'Case Deals', image: CaseDeals },
    { text: 'New Arrival', image: NewArrival },
    { text: 'Weekly Ads', image: WeeklyAds },
    { text: 'Buy 1 Get 1', image: Buy1Get1 },
    { text: 'Clearance', image: Clearance },
    { text: 'Meadows', image: Meadows },
    { text: 'Case Deals', image: CaseDeals },
  ];

  const CategoryItem = ({ category }: { category: { text: string; image: string } }) => (
    
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        padding: 3,
        borderRadius: 1,
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box
        component="img"
        src={category.image}
        alt={category.text}
        sx={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          objectFit: 'cover',
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        fontSize={'0.8rem'}
        sx={{
          fontWeight: '650',
          transition: 'color 0.2s ease',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      >
        {category.text}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '8px', padding: 3}}>
      <MuiCarousel
        slidesToShow={{
          mobile: 2,
          tablet: 3,
          desktop: 5
        }}
        slidesToScroll={{
          mobile: 1,
          tablet: 2,
          desktop: 5
        }}
        dots={false}
        style={{
          borderRadius: 16,
          width: '65vw',
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {categories.map((category, index) => (
          <CategoryItem key={index} category={category} />
        ))}
      </MuiCarousel>
    </Box>
  );
};

export default CategoriesSection;
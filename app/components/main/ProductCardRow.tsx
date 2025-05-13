import React from 'react';
import ProductCard from './ProductCard';
import type { ProductCardProps } from './ProductCard';
import type { Product } from './Product';
import product1 from '../res/product/product1.avif';
import product2 from '../res/product/product2.avif';
import product3 from '../res/product/product3.avif';
import product4 from '../res/product/product4.avif';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



interface ProductCardRowProps {
  title?: string;
  onViewMore?: () => void;
}

import { useNavigate } from 'react-router-dom';

const ProductCardRow: React.FC<ProductCardRowProps> = ({ 
  title = 'Featured Products', 
  onViewMore = () => {} 
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const products: {
    product: Product;
    tag?: string;
    tagColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    status?: 'in-stock' | 'out-of-stock';
  }[] = [
    {
      product: {
        image: product1,
        brand: 'Brand A',
        productName: 'Premium Quality Product 1',
        price: 99.99,
        oldPrice: 129.99,
        volume: '300ml',
      },
      tag: 'Multiple Offers',
      tagColor: 'warning',
      status: 'in-stock',
    },
    {
      product: {
        image: product2,
        brand: 'Brand B',
        productName: 'Product 2',
        price: 89.99,
        oldPrice: 109.99,
        volume: '250ml',
      },
      tag: 'Buy 2 for 150',
      tagColor: 'primary',
      status: 'in-stock',
    },
    {
      product: {
        image: product3,
        brand: 'Brand C',
        productName: 'Organic Product 3',
        price: 79.99,
        volume: '200ml',
      },
      status: 'in-stock',
    },
    {
      product: {
        image: product4,
        brand: 'Brand D',
        productName: 'Natural Product 4',
        price: 69.99,
        oldPrice: 89.99,
        volume: '400ml',
      },
      status: 'out-of-stock',
    },
    {
      product: {
        image: product1,
        brand: 'Brand E',
        productName: 'Luxury Product 5',
        price: 149.99,
        volume: '500ml',
      },
      tag: 'New',
      tagColor: 'success',
      status: 'in-stock',
    },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2,
          mt: 2,
          px: 1
        }}
      >
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
        <Button 
          endIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.9rem' }} />}
          onClick={() => navigate('/products')}
          sx={{
            color: theme.palette.primary.main,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            }
          }}
        >
          View more
        </Button>
      </Box>
    
    
    <Box 
      sx={{
        width: '65vw',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: 3,
        p: 2,
        marginTop: '16px'
      }}
    >

    
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          pb: 1,
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '3px',
          },
        }}
      >
        {products.map((item, index) => (
          <Box key={index} sx={{ minWidth: '250px' }}>
            <ProductCard
              product={item.product}
              tag={item.tag}
              tagColor={item.tagColor}
              status={item.status}
            />
          </Box>
        ))}
      </Box>
    </Box>
    </Box>
  );
};

export default ProductCardRow;

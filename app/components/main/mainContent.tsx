
import Box from '@mui/material/Box';
import SimpleSlider from './AdCarousel';
import CategoriesSection from './CategoriesSection';
import FloatingButtons from './FloatingButtons';
import Footer from './Footer';
import ProductCard from './ProductCard';
import ProductCardRow from './ProductCardRow';
import { CartProvider } from './CartContext';

export default function MainContent() {
  return (
    <CartProvider>
      <MainContentInner />
    </CartProvider>
  );
}

function MainContentInner() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: '#F8F8F8',
        minHeight: '100vh',
      }}
    >
      <Box width={'100%'}>
        <SimpleSlider/>
      </Box>

      <Box sx={{width: '100%'}}>
        <CategoriesSection />
      </Box>
      <FloatingButtons/>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%',
      }}>
        <ProductCardRow />
        <ProductCardRow title="Top Sell" />
        <ProductCardRow title="New Arrivals" />
      </Box>
      <Footer />
    </Box>

  );
}

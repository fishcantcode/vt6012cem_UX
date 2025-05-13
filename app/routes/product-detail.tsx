import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Chip,
  Paper,
  Divider,
  Checkbox,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import PrimarySearchAppBar from "../components/appbar";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import product1 from 'app/components/res/product/product1.avif';
import product2 from 'app/components/res/product/product2.avif';
import product3 from 'app/components/res/product/product3.avif';
import product4 from 'app/components/res/product/product4.avif';
import { CartProvider } from '~/components/main/CartContext';
import ProductImageGallery from '../components/main/ProductImageGallery';
import ProductInfoPanel from '../components/main/ProductInfoPanel';
import Link from '@mui/material/Link';
import ProductCard from '../components/main/ProductCard';
import ProductCardRow from '../components/main/ProductCardRow';
import { mockPromotions } from '../components/mocks/mockPromotions';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '~/components/main/Footer';

type Product = {
  image: string;
  name: string;
  price: number;
  oldPrice: number;
  tags: string[];
  volume: string;
  origin: string;
  quality: string;
  storage: string;
  promotion: string;
  promoDetail: string;
  description: string;
};

export function loader() {

  return {
    image: '/mock/asahi.png',
    name: "Asahi Beer Can 12's",
    price: 69.0,
    oldPrice: 79.0,
    tags: ['Crispy', 'Refreshing'],
    volume: '330MLX12',
    origin: 'Japan',
    quality: '330MLX12',
    storage: 'In Stock',
    promotion: 'Freebie offer for Selected Categories',
    promoDetail: 'Get 1 free gift(s) upon purchase of every $80 from selected category(ies). Each order is entitled to this offer for 1 time(s) only. While stocks last.',
    description: 'Asahi Super Dry is brewed to perfectly complement any meal with its crisp, clear taste and quick, clean finish.',
  } satisfies Product;
}

const ProductDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) {
      navigate('/', { replace: true });
    }
    console.log(product);
  }, [product, navigate]);

  if (!product) return null;

  const handleBack = () => window.history.back();

  const handleQuickView = () => {
    alert('Quick View for: ' + product.productName);
  };

  return (
    <CartProvider>
      <Box sx={{ bgcolor: '#f5f5f5', py: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <PrimarySearchAppBar />
  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: -5}}>
    <Box sx={{ width: '100%', maxWidth: '65vw', mb: 2 }}>
      <Typography variant="body2" sx={{ color: 'grey.600', fontWeight: 500 }}>
        <Link href="/" underline="hover" color="primary.main" sx={{ fontWeight: 500 }}>Home</Link> {'>'} Mock Category {'>'} <Box component="span" sx={{ color: 'primary.main', display: 'inline', fontWeight: 600 }}>{product.productName}</Box>
      </Typography>
    </Box>
  </Box>
  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <Paper sx={{ p: 3, borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 4, maxWidth: "65vw", width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 4, width: '100%' }}>
        <Box sx={{ minWidth: 340, maxWidth: 400, flex: '1 1 340px', display: 'flex', justifyContent: 'center' }}>
          <ProductImageGallery images={[product.image, product1, product2]} alt={product.name} />
        </Box>
        <Box sx={{ flex: 2, minWidth: 0 }}>
          <ProductInfoPanel
            product={{
              image: product.image,
              brand: product.brand ,
              productName: product.productName || product.name, 
              price: product.price,
              oldPrice: product.oldPrice,
              tags: product.tags,
              volume: product.volume,
              origin: product.origin,
              quality: product.quality,
              storage: product.storage,
              promotion: product.promotion,
              promoDetail: product.promoDetail,
              description: product.description,
              favorite: product.favorite
            }}
          />
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mb: 2, width: '100%' }}>
        <Typography variant="h6" fontWeight={900} sx={{ mb: 2 }}>Offer(s) available</Typography>
        {mockPromotions.map((promo, idx) => (
          <Accordion key={promo.id} defaultExpanded={idx === 0} sx={{ mb: 1, borderRadius: 2, bgcolor: '#f7f7f7' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 32, color: '#1976d2' }} />} sx={{ bgcolor: '#e0e0e0', borderRadius: 2 }}>
              <Typography variant="body1" fontWeight={700} color="warning.main">{promo.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="warning.main" fontWeight={700} sx={{ mb: 1 }}>{promo.description}</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {promo.products.map(prod => (
                  <ProductCard
                    key={prod.id}
                    product={{
                      image: prod.image,
                      brand: prod.brand,
                      productName: prod.name,
                      price: prod.price,
                      oldPrice: prod.oldPrice,
                      volume: prod.volume || "",
                    }}
                    status="in-stock"
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />
      <Box sx={{ mb: 2, width: '100%'}}>
        <Typography variant="h6" fontWeight={700}>Description</Typography>
        <Typography variant="body1" color="text.secondary">{product.description}</Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: 1, width: '100%', justifyContent:'space-evenly', mb: 8 }}>
        <Grid item xs={6} md={3}><b>Origin</b><br />{product.origin}</Grid>
        <Grid item xs={6} md={3}><b>Ingredients</b><br />Alcohol Content 5%</Grid>
        <Grid item xs={6} md={3}><b>Storage Condition</b><br />Keep in a cool and dry place and avoid direct sunlight.</Grid>
        <Grid item xs={6} md={3}><b>Width</b><br />70</Grid>
        <Grid item xs={6} md={3}><b>Height</b><br />118</Grid>
        <Grid item xs={6} md={3}><b>Depth</b><br />70</Grid>
      </Grid>
    </Paper>
  </Box>

  
  <Typography variant="h5" fontWeight={900} sx={{ mt: 4, mb: 0.5, color: 'black', width: '65vw', maxWidth: '1100px', mx: 'auto', pl: 1 }}>
    For You
  </Typography>
  <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 3, width: '65vw', maxWidth: '1100px', mx: 'auto', boxShadow: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 270 }}>
        <img src={product1} alt="Product 1" style={{ width: 110, borderRadius: 10, background: '#f7f7f7', boxShadow: '0 2px 8px #eee' }} />
        <Typography variant="h3" fontWeight={900} color="primary" sx={{ mx: 1 }}>+</Typography>
        <img src={product2} alt="Product 2" style={{ width: 110, borderRadius: 10, background: '#f7f7f7', boxShadow: '0 2px 8px #eee' }} />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, ml: 4 }}>
        <Box sx={{ display: 'flex',alignContent: 'start', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <input type="checkbox" checked readOnly style={{ transform: 'scale(1.3)', accentColor: '#2551b3' }} />
          <Typography variant="h6" fontWeight={600} color="#222">Beer Can 12's</Typography>
          </Box>
          <Typography variant="h6" fontWeight={700} color="error.main" sx={{ ml: 2 }}>$69.00</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <input type="checkbox" checked readOnly style={{ transform: 'scale(1.3)', accentColor: '#2551b3' }} />
          <Typography variant="h6" fontWeight={600} color="#222">Coca Cola</Typography>
          </Box>
          <Typography variant="h6" fontWeight={700} color="error.main" sx={{ ml: 2 }}>$29.00</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
          <Typography variant="h6" fontWeight={700} color="#222" sx={{ mr: 2 }}>Total Price:</Typography>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#d32f2f' }}>$107.00</Typography>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="outlined"
            sx={{
              bgcolor: '#f4f6fa',
              color: '#2551b3',
              fontWeight: 700,
              fontSize: 18,
              px: 4,
              py: 1.5,
              borderRadius: 4,
              boxShadow: '0 2px 7px #eee',
              border: 'none',
              transition: 'all 0.15s',
              '&:hover': {
                bgcolor: '#e3eafc',
                color: '#2551b3',
                boxShadow: '0 4px 14px #e3eafc',
              }
            }}
          >
            Add Selected to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>

  <Box sx={{
    bgcolor: '#f5f5f5',
    borderRadius: 3,
    mt: 4,
    width: '100%',
    boxShadow: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Box sx={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ProductCardRow title="Similar Products"/>
    </Box>
  </Box>
</Box>
<Footer />
    </CartProvider>
    
  );
};

export default ProductDetailPage;

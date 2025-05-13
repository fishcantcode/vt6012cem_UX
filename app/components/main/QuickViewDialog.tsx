import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  Paper,
  Box,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import type { Product } from './Product';

export interface QuickViewDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  quantity: number;
  onQuantityChange: (n: number) => void;
  onAddToCart: () => void;
}

const QuickViewDialog: React.FC<QuickViewDialogProps> = ({
  open,
  onClose,
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
}) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = React.useState(product.favorite || false);
  React.useEffect(() => {
    setFavorite(product.favorite || false);
  }, [product]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" PaperProps={{ sx: { borderRadius: 4, bgcolor: '#222', p: 0 } }}>
      <Paper elevation={3} sx={{ display: 'flex', p: 4, bgcolor: '#fff', borderRadius:'4px 4px 0 0', minWidth: 700, minHeight: 380, position: 'relative' }}>

        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, right: 16, bgcolor: '#eee' }}>
          <CloseIcon />
        </IconButton>

        <Box sx={{ flex: '0 0 320px', display: 'flex', alignItems: 'center', justifyContent: 'center', pr: 4 }}>
          <Box component="img" src={product.image} alt={product.productName} sx={{ width: 260, height: 180, objectFit: 'contain', borderRadius: 2, bgcolor: '#fff' }} />
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
          <Box sx={{ mb: 2 }}>
  <Typography variant="h6" sx={{ color: '#222', fontWeight: 700 }}>{product.brand}</Typography>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Typography variant="h4" sx={{ color: '#111', fontWeight: 700, lineHeight: 1.1 }}>{product.productName}</Typography>
    <IconButton onClick={() => setFavorite(fav => !fav)} size="small" sx={{ ml: 1 }}>
      {favorite ? <FavoriteIcon sx={{ color: 'error.main' }} /> : <FavoriteBorderIcon sx={{ color: '#222' }} />}
    </IconButton>
  </Box>
  <Typography variant="h3" sx={{ color: 'red', fontWeight: 700, mt: 1 }}>${product.price}</Typography>
</Box>
          <Box sx={{ display: 'flex', gap: 5, mb: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#222', fontWeight: 700 }}>Quality</Typography>
              <Typography variant="body2" sx={{ color: '#888', fontWeight: 600 }}>{product.quality || product.volume}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#222', fontWeight: 700 }}>Storage</Typography>
              <Typography variant="body2" sx={{ color: '#888', fontWeight: 600 }}>{product.storage || 'In Stock'}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#222', fontWeight: 700 }}>Place of Origin</Typography>
              <Typography variant="body2" sx={{ color: '#888', fontWeight: 600 }}>{product.origin || '-'}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <Button variant="outlined" sx={{ minWidth: 44, fontSize: 24, px: 0 }} onClick={() => onQuantityChange(Math.max(1, quantity - 1))}>-</Button>
            <Typography sx={{ fontSize: 24, fontWeight: 700, minWidth: 32, textAlign: 'center' }}>{quantity}</Typography>
            <Button variant="outlined" sx={{ minWidth: 44, fontSize: 24, px: 0 }} onClick={() => onQuantityChange(quantity + 1)}>+</Button>
            <Button variant="contained" color="primary" sx={{ ml: 4, px: 5, fontSize: 20, borderRadius: 8 }} onClick={onAddToCart}>
              Add To Cart
            </Button>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ bgcolor: '#eee', p: 2, textAlign: 'center', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
        <Typography
          variant="subtitle1"
          sx={{ color: '#222', fontWeight: 600, letterSpacing: 1, cursor: 'pointer', '&:hover': { textDecoration: 'underline', color: 'primary.main' } }}
          onClick={() => {
            onClose();
            setTimeout(() => {
              navigate('/product-detail', { state: { product } });
            }, 200);
          }}
        >
          View Product Detail
        </Typography>
      </Box>
    </Dialog>
  );
};

export default QuickViewDialog;


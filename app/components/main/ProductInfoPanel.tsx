import React, { useState } from 'react';
import { Box, Typography, Chip, Button, IconButton, Stack } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';

import type { Product } from './Product';

interface ProductInfoPanelProps {
  product: Product;
  deliveryMethods?: string[];
  availableStore?: string;
  onCheckAvailability?: () => void;
}

const ProductInfoPanel: React.FC<ProductInfoPanelProps> = ({
  product,
  deliveryMethods = ['Home Delivery', 'Click & Collect'],
  availableStore = 'Available',
  onCheckAvailability,
}) => {
  const {
    brand,
    productName,
    price,
    oldPrice,
    tags = [],
    volume,
    description,
  } = product;

  const mockTags = ['# Imported', '# Best Seller'];
  const [quantity, setQuantity] = useState(1);
  

  return (
    <Box sx={{ px: 2, py: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>

      <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>{brand}</Typography>
      <Typography variant="h4" fontWeight={700} gutterBottom>{productName}</Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h5" color="error" fontWeight={700}>${Number(price).toFixed(2)}</Typography>
        <Typography variant="body1" color="text.disabled" sx={{ textDecoration: 'line-through' }}>
          ${oldPrice !== undefined && !isNaN(Number(oldPrice)) ? Number(oldPrice).toFixed(2) : '--'}
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary">{volume}</Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 1 }}>
        {mockTags.map(tag => (
          <Chip key={tag} label={tag} color="primary" size="medium" />
        ))}
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>Delivery Method |</Typography>
        {deliveryMethods.map((method, idx) => {
          let icon = null;
          if (method === 'Home Delivery') icon = <LocalShippingIcon fontSize="small" sx={{ mr: 0.5 }} />;
          if (method === 'Click & Collect') icon = <StorefrontIcon fontSize="small" sx={{ mr: 0.5 }} />;
          return (
            <Box key={method} sx={{ display: 'flex', alignItems: 'center' }}>
              {icon}
              <Typography variant="body2">{method}{idx < deliveryMethods.length - 1 ? ' |' : ''}</Typography>
            </Box>
          );
        })}
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>Available Store |</Typography>
        <Button size="small" variant="text" sx={{ textTransform: 'none', p: 0 }} onClick={onCheckAvailability}>
          Check Availability
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
        <Button startIcon={<FavoriteBorderIcon />} variant="outlined" size="small">Add to Wishlist</Button>
        <Button startIcon={<ShareIcon />} variant="outlined" size="small">Share with Friends</Button>
      </Stack>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Button variant="outlined" size="small" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
            <Typography>{quantity}</Typography>
            <Button variant="outlined" size="small" onClick={() => setQuantity(q => q + 1)}>+</Button>
            <Button variant="contained" color="primary">Add to Cart</Button>
          </Box>
    </Box>
  );
};

export default ProductInfoPanel;

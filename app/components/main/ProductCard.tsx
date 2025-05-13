import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Chip, IconButton, Tooltip, Snackbar, InputBase } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCart } from './CartContext';
import SmartSaverDrawer from './SmartSaverDrawer';

import type { Product } from './Product';

export interface ProductCardProps {
  product: Product;
  tag?: string;
  tagColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  status?: 'in-stock' | 'out-of-stock';
  onAddToCart?: () => void;
  onAddToCartProgress?: (price: number, quantity: number) => void;
  disableSnackbar?: boolean;
}

const PRODUCT_NAME_LIMIT = 16; 

import QuickViewDialog from './QuickViewDialog';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  tag,
  tagColor,
  status,
  onAddToCartProgress,
  disableSnackbar
}) => {

  const { image, brand, productName, price, volume, oldPrice } = product;

  const [smartSaverOpen, setSmartSaverOpen] = useState(false);
  const handleOpenSmartSaver = () => setSmartSaverOpen(true);
  const handleCloseSmartSaver = () => setSmartSaverOpen(false);
  const [favorite, setFavorite] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [freebieRedeemAdded, setFreebieRedeemAdded] = useState(false);

  const isFreebieOrRedeem = tag === 'Freebie' || tag === 'Redeem';
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewQty, setQuickViewQty] = useState(1);

  const { addToCart } = useCart();

  const displayProductName = productName.length > PRODUCT_NAME_LIMIT
    ? productName.slice(0, PRODUCT_NAME_LIMIT) + '...'
    : productName;

  const handleAddToCart = () => {

    if (isFreebieOrRedeem) {
      addToCart(productName, 1);
      setSnackbarOpen(true);
      setShowSelector(false);
      setFreebieRedeemAdded(true);
      if (onAddToCartProgress) {
        if (!isNaN(price)) {
          onAddToCartProgress(price, 1);
        }
      }
    } else {
      setShowSelector(true);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (isFreebieOrRedeem) {
      setQuantity(1);
    } else {
      const val = Math.max(1, parseInt(e.target.value) || 1);
      setQuantity(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (isFreebieOrRedeem) {
        addToCart(productName, 1);
        setSnackbarOpen(true);
        setShowSelector(false);
        setFreebieRedeemAdded(true);
        if (onAddToCartProgress) {
          if (!isNaN(price)) {
            onAddToCartProgress(price, 1);
          }
        }
      } else {
        addToCart(productName, quantity);
        setSnackbarOpen(true);
        setShowSelector(false);
        if (onAddToCartProgress) {
          if (!isNaN(price)) {
            onAddToCartProgress(price, quantity);
          }
        }
      }
    }
  };


  const handleIncrement = () => {

  if (isFreebieOrRedeem) {
    setSnackbarOpen(true);
    setQuantity(1);
  } else {
    setQuantity(q => q + 1);
    addToCart(productName, quantity + 1);
    setSnackbarOpen(true);
    if (onAddToCartProgress) {
      if (!isNaN(price)) {
        onAddToCartProgress(price, 1);
      }
    }
  }
};
  const handleDecrement = () => {
  setQuantity(q => Math.max(1, q - 1));
  addToCart(productName, Math.max(1, quantity - 1));
  setSnackbarOpen(true);
  if (onAddToCartProgress) {
    if (!isNaN(price)) {
      onAddToCartProgress(price, -1);
    }
  }
};

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
      <Box
        sx={{
          width: 220,
          background: '#fff',
          borderRadius: 2,
          boxShadow: 2,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          minHeight: 340,

        }}

      >

      <Box
        component="img"
        src={image}
        alt={productName}
        sx={{ width: 150, height: 150, objectFit: 'contain', mb: 1, mt: 1, cursor: 'pointer' }}
        onClick={e => { e.stopPropagation(); setQuickViewOpen(true); }}
      />

      {tag && (
        <Chip
          label={tag}
          color={tagColor || 'default'}
          size="small"
          sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 600, cursor: 'pointer' }}
          onClick={handleOpenSmartSaver}
        />
      )}

      <SmartSaverDrawer open={smartSaverOpen} onClose={handleCloseSmartSaver} />

      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary">
            {brand}
          </Typography>
          <Tooltip title={productName.length > PRODUCT_NAME_LIMIT ? productName : ''} arrow>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120,mb:2 }}>
              {displayProductName}
            </Typography>
          </Tooltip>
        </Box>

        <IconButton
          aria-label="add to favorites"
          sx={{
            color: favorite ? 'error.main' : 'grey.700',
            transition: 'color 0.2s',
            ml: 1,
            '&:hover': {
              color: 'error.main',
            },
          }}
          onClick={() => setFavorite(fav => !fav)}
        >
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>


    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', mb: 0.5 }}>
      <Typography 
        variant="body2" 
        sx={{ 
          textDecoration: 'line-through', 
          color: oldPrice ? 'grey.500' : 'transparent',
          fontSize: 15, 
          lineHeight: 1,
          visibility: oldPrice ? 'visible' : 'hidden',
          height: '1.5em' 
        }}
      >
        {oldPrice ? `$${oldPrice}` : '$0'}
      </Typography>
      <Typography variant="h5" color="error" fontWeight={700} sx={{ fontSize: 26, lineHeight: 1.2 }}>
        ${price}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, fontSize: 15, fontWeight: 500, letterSpacing: 1 }}>
      {volume}
    </Typography>
    </Box>

    {status === 'in-stock' && !showSelector && (
      <Button
        variant="contained"
        color="primary"
        size="small"
        fullWidth
        onClick={e => { e.stopPropagation(); handleAddToCart(); }}
        disabled={isFreebieOrRedeem ? freebieRedeemAdded : false}
        sx={isFreebieOrRedeem && freebieRedeemAdded ? { backgroundColor: '#ccc', color: '#888', cursor: 'not-allowed' } : {}}
      >
         Add To Cart
      </Button>
    )}
    {status === 'in-stock' && showSelector && (
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Button onClick={handleDecrement} disabled={isFreebieOrRedeem || quantity <= 1}>-</Button>
        <InputBase
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && isFreebieOrRedeem) {
              addToCart(productName, 1);
              setSnackbarOpen(true);
              setShowSelector(false);
              setFreebieRedeemAdded(true);
              if (typeof price === 'string' && onAddToCartProgress) {
                const priceNum = parseFloat(price);
                if (!isNaN(priceNum)) {
                  onAddToCartProgress(priceNum, 1);
                }
              }
            } else {
              handleKeyDown(e);
            }
          }}
          inputProps={{ min: 1, max: isFreebieOrRedeem ? 1 : undefined, style: { textAlign: 'center', width: 40 } }}
          sx={{ fontSize: 20, fontWeight: 600, justifyContent:'center',alignItems: 'center' }}
          disabled={isFreebieOrRedeem}
        />
        <IconButton onClick={handleIncrement} sx={{ color: 'primary.main' }} size="small" disabled={isFreebieOrRedeem}>
          +
        </IconButton>
      </Box>
    )}
    {status === 'out-of-stock' && (
      <Button variant="outlined" color="secondary" size="small" fullWidth disabled>
        Out of Stock
      </Button>
    )}
  </Box>

  { !disableSnackbar && (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={2000}
      onClose={handleSnackbarClose}
      message={`Added ${quantity} × ${productName} to cart`}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    />
  ) }

  <QuickViewDialog
    open={quickViewOpen}
    onClose={() => setQuickViewOpen(false)}
    product={{
      ...product,
      quality: volume, 
      storage: status === 'in-stock' ? 'In Stock' : 'Out of Stock',
      origin: '', 
      favorite: favorite,
    }}
    quantity={quickViewQty}
    onQuantityChange={setQuickViewQty}
    onAddToCart={() => {
      addToCart(productName, quickViewQty);
      setQuickViewOpen(false);
      setQuickViewQty(1);
    }}
  />
  </>

);
}

export default ProductCard;
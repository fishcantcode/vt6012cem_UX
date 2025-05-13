import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';
import product1 from '../res/product/product1.avif';
import product2 from '../res/product/product2.avif';
import product3 from '../res/product/product3.avif';
import product4 from '../res/product/product4.avif';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img?: string;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveCartItem: (id: number) => void;
  onUpdateQty?: (id: number, qty: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose, cartItems, onRemoveCartItem, onUpdateQty }) => {

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const deliveryThreshold = 350;
  const deliveryProgress = Math.min((subtotal / deliveryThreshold) * 100, 100);
  const progressLabel = subtotal >= deliveryThreshold
    ? 'You have qualified for free delivery!'
    : `$${(deliveryThreshold - subtotal).toFixed(2)} away from free delivery`;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ zIndex: 2000 }}
      PaperProps={{ sx: { width: 380, p: 0, bgcolor: '#fff' } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #eee' }}>
        <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
          Cart preview ({totalQty})
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ p: 2, pt: 3, pb: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#FFD600',
            color: '#222',
            fontWeight: 700,
            borderRadius: 8,
            width: '100%',
            fontSize: 18,
            mb: 1.5,
            boxShadow: 'none',
            '&:hover': { bgcolor: '#FFC400' },
          }}
          fullWidth
        >
          Go to shopping cart
        </Button>
        <Typography sx={{ color: '#9C7B2F', fontWeight: 500, fontSize: 16, textAlign: 'center', mb: 1 }}>
          Enjoy free delivery on orders above $350.00
        </Typography>
        <Box sx={{ width: '100%', mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={deliveryProgress}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: '#f5f5f5',
              '& .MuiLinearProgress-bar': {
                bgcolor: subtotal >= deliveryThreshold ? '#43a047' : '#FFD600', 
              },
            }}
          />
          <Typography sx={{ mt: 0.5, fontSize: 13, color: subtotal >= deliveryThreshold ? 'success.main' : '#666', fontWeight: 500, textAlign: 'center' }}>
            {progressLabel}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ maxHeight: 'calc(100vh - 220px)', overflowY: 'auto', p: 2, pt: 1 }}>
        {cartItems.length === 0 ? (
          <Box sx={{ color: '#888', textAlign: 'center', mt: 4 }}>Cart is empty</Box>
        ) : (
          cartItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', py: 2, position: 'relative' }}>
                <Box
                  component="img"
                  src={product2}
                  alt={item.name}
                  sx={{ width: 56, height: 56, borderRadius: 2, objectFit: 'cover', mr: 2, border: '1px solid #eee' }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      sx={{ border: '1px solid #ccc', borderRadius: 2, width: 32, height: 32 }}
                      onClick={() => onUpdateQty && onUpdateQty(item.id, Math.max(1, item.qty - 1))}
                      disabled={item.qty <= 1}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Box
                      sx={{
                        px: 2,
                        py: 0.5,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        minWidth: 38,
                        textAlign: 'center',
                        fontWeight: 500,
                        fontSize: 16,
                        bgcolor: '#fafafa',
                      }}
                    >
                      {item.qty}
                    </Box>
                    <IconButton
                      size="small"
                      sx={{ border: '1px solid #ccc', borderRadius: 2, width: 32, height: 32 }}
                      onClick={() => onUpdateQty && onUpdateQty(item.id, item.qty + 1)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  color="error"
                  aria-label="Remove item"
                  sx={{ position: 'absolute', top: 2, right: 2 }}
                  onClick={() => onRemoveCartItem(item.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              {idx < cartItems.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;

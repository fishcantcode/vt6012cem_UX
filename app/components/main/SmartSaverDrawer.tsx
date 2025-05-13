import React, { useState } from 'react';
import MuiCarousel from './MuiCarousel';
import { Drawer, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
interface SmartSaverDrawerProps {
  open: boolean;
  onClose: () => void;
}
const OFFERS = [
  { id: 'buy2for150', title: 'Buy 2 for 150' },
  { id: 'freeGift', title: 'Buy $200 for Free Gift' },
  { id: 'redemption', title: '$12 Redemption' },
];
import ProductCard from './ProductCard';
import LinearProgress from '@mui/material/LinearProgress';
import product1 from '../res/product/product1.avif';
import product2 from '../res/product/product2.avif';
import product3 from '../res/product/product3.avif';
import product4 from '../res/product/product4.avif';
import { Tag } from '@mui/icons-material';
function Buy2For150Section() {
  return (
    <Box sx={{ minHeight: 180, p: 2 }}>
      <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
        Selected Offer: Buy 2 for 150
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120, borderRadius: 2, mt: 2, color: '#bbb', p: 2 }}>
        <ProductCard
          product={{
            image: product1,
            brand: "Brand A",
            productName: "Premium Quality Product 1",
            price: 199.98,
            oldPrice: 389.97,
            volume: "300ml x3"
          }}
          tagColor="warning"
          status="in-stock"
          disableSnackbar={false}
          onAddToCart={() => {}}
        />
      </Box>
    </Box>
  );
}
const allowedTagColors = [
  'default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'
] as const;
type TagColor = typeof allowedTagColors[number];
function isTagColor(color: any): color is TagColor {
  return allowedTagColors.includes(color);
}
function FreeGiftSection() {
    const [progress, setProgress] = React.useState(99.9);
  const [freebieDrawerOpen, setFreebieDrawerOpen] = React.useState(false);
  const products = [
    {
      image: product2,
      brand: 'Brand B',
      productName: 'Product 2',
      price: 89.99,
      oldPrice: 109.99,
      tag: 'Buy 2 for 150',
      volume: '250ml',
      tagColor: 'primary',
      status: 'in-stock',
      priceValue: 89.99
    },
    {
      image: product3,
      brand: 'Brand C',
      productName: 'Organic Product 3',
      price: 79.99,
      volume: '200ml',
      status: 'in-stock',
      priceValue: 79.99
    },
    {
      image: product4,
      brand: 'Brand D',
      productName: 'Natural Product 4',
      price: 69.99,
      oldPrice: 89.99,
      volume: '400ml',
      status: 'in-stock',
      priceValue: 69.99
    },
  ];
  const target = 200;
  const current = progress;
  const progressValue = Math.min((current / target) * 100, 100);
  const progressColor = current >= target ? 'success' : 'warning';
  const canSelectFreebie = current >= target;
  return (
    <Box sx={{ minHeight: 220, p: 2 }}>
      <Box sx={{ display: 'flex', minHeight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 700 }}>
          Selected Offer: Buy $200 for Free Gift
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{minWidth: 100, fontSize: 16, boxShadow: 2, opacity: canSelectFreebie ? 1 : 0.5 }}
          disabled={!canSelectFreebie}
          onClick={() => setFreebieDrawerOpen(true)}
        >
          Select Freebie
        </Button>
      </Box>

      <Box sx={{ mt: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: progressColor === 'success' ? 'green' : '#f9a825', mr: 1 }}>
            ${current.toFixed(2)} / ${target}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{ flex: 1, height: 12, borderRadius: 6, background: '#eee',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: progressColor === 'success' ? 'green' : '#f9a825',
                },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ width: '100%', mb: 2 }}>
        <MuiCarousel
          slidesToShow={{ mobile: 1, tablet: 2, desktop: 2 }}
          slidesToScroll={1}
          dots={false}
          style={{ width: '100%', backgroundColor: 'white', boxShadow: 'none' }}
        >
          {products.map((p, i) => (
            <Box key={i} sx={{ minWidth: 250, maxWidth: 300, px: 1 }}>
              <ProductCard
                product={{
                  image: p.image,
                  brand: p.brand,
                  productName: p.productName,
                  price: p.price,
                  oldPrice: p.oldPrice,
                  volume: p.volume,
                }}
                tag={p.tag}
                tagColor={isTagColor(p.tagColor) ? p.tagColor : undefined}
                status={p.status as 'in-stock' | 'out-of-stock'}
                disableSnackbar={true}
                onAddToCart={() => {
                  const priceToAdd = typeof p.priceValue === 'number' ? p.priceValue : parseFloat(p.priceValue);
                  setProgress(prev => prev + priceToAdd);
                }}
                onAddToCartProgress={(price, quantity) => setProgress(prev => prev + price * quantity)}
              />
            </Box>
          ))}
        </MuiCarousel>
      </Box>

      <FreebieDrawer open={freebieDrawerOpen} onClose={() => setFreebieDrawerOpen(false)} />
    </Box>
  );
}
function FreebieDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const freebies = [
    { image: product1, brand: 'Brand A', productName: 'Freebie 1', price: '0.00', tag: 'Freebie', tagColor: 'success', volume: '100ml', status: 'in-stock' }
  ];
  const [addedIndex, setAddedIndex] = React.useState<number | null>(null);
    React.useEffect(() => {
    if (!open) setAddedIndex(null);
  }, [open]);
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 400, bgcolor: 'white', height: '100%', boxSizing: 'border-box', position: 'relative', p:2 }}>
      <Box sx={{ display: 'flex', minHeight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 650, color: 'green',mb:2 }}>
          Select Your Freebie
        </Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {freebies.map((f, i) => (
            <ProductCard
              key={i}
              product={{
                image: f.image,
                brand: f.brand,
                productName: f.productName,
                price: typeof f.price === 'string' ? parseFloat(f.price) : f.price,
                volume: f.volume
              }}
              tag={f.tag}
              tagColor={isTagColor(f.tagColor) ? f.tagColor : undefined}
              status={addedIndex === i ? 'out-of-stock' : 'in-stock'}
              onAddToCart={() => setAddedIndex(i)}
              disableSnackbar={false}
            />
          ))}
        </Box>
      </Box>
    </Drawer>
  );
}
function RedemptionSection() {
    const redeemProduct = {
    image: product1,
    brand: 'Brand A',
    productName: 'Redeemable Product',
    price: 12.00,
    volume: '100ml',
    status: 'in-stock'
  };
  const [redeemed, setRedeemed] = React.useState(false);
  return (
    <Box sx={{ minHeight: 180, p: 2 }}>
      <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
        Selected Offer: $12 Redemption
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120, borderRadius: 2, mt: 2, color: '#bbb', p: 2 }}>
        <ProductCard
          product={{
            image: redeemProduct.image,
            brand: redeemProduct.brand,
            productName: redeemProduct.productName,
            price: redeemProduct.price,
            volume: redeemProduct.volume
          }}
          status={redeemed ? 'out-of-stock' : 'in-stock'}
          onAddToCart={() => setRedeemed(true)}
          tag="Redeem"
          tagColor="success"
          disableSnackbar={false}
        />
      </Box>
    </Box>
  );
}
const SmartSaverDrawer: React.FC<SmartSaverDrawerProps> = ({ open, onClose }) => {
  const [selectedId, setSelectedId] = useState<string>(OFFERS[0].id);
    const handleDrawerClose = (event: object, reason: string) => {
    if (reason === 'escapeKeyDown') {
      onClose();
    }
  };
  function renderSelectedSection() {
    switch (selectedId) {
      case 'buy2for150':
        return <Buy2For150Section />;
      case 'freeGift':
        return <FreeGiftSection />;
      case 'redemption':
        return <RedemptionSection />;
      default:
        return null;
    }
  }
  return (
    <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
      <Box sx={{ width: 600, maxWidth: '100vw', p: 4, bgcolor: 'white', height: '100%', boxSizing: 'border-box', position: 'relative' }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', top: 30, right: 30, zIndex: 1, color: 'black'  }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 900, color: 'black', mb: 2, textDecoration: 'underline', pr: 5 }}>
          Smart Saver
        </Typography>
        <Box sx={{ borderBottom: '2px solid #eee', mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Offer(s) available
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {OFFERS.map((offer) => (
            <Button
              key={offer.id}
              variant={selectedId === offer.id ? 'contained' : 'outlined'}
              sx={{
                bgcolor: selectedId === offer.id ? '#f9a825' : undefined,
                color: selectedId === offer.id ? 'white' : undefined,
                fontWeight: 600,
                boxShadow: 2,
              }}
              onClick={() => setSelectedId(offer.id)}
            >
              {offer.title}
            </Button>
          ))}
        </Box>
        <Box sx={{ borderBottom: '2px solid #eee', mb:1 }} />
        {renderSelectedSection()}
      </Box>
    </Drawer>
  );
};
export default SmartSaverDrawer;

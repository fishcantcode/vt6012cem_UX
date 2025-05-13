import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import type { SelectChangeEvent } from '@mui/material/Select';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PersonOutline from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useCart } from './main/CartContext';
import CartDrawer from './main/CartDrawer';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Container from '@mui/material/Container';
import SearchBar from './searchBar';
import Logo from './logo';
import Delivery from './delivery';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import StoreIcon from '@mui/icons-material/Store';
import LanguageIcon from '@mui/icons-material/Language';
import AppsIcon from '@mui/icons-material/Apps';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import CategoriesBtn from "../components/CategoriesBtn";
import bgHeader from "./res/bg_header.png";

function CartIconWithBadge({ onClick, count }: { onClick: () => void; count: number }) {
  return (
    <IconButton size="small" color="inherit" onClick={onClick}>
      <Badge badgeContent={count} color="error" overlap="rectangular">
        <ShoppingCartIcon fontSize="large" />
      </Badge>
    </IconButton>
  );
}

export default function PrimarySearchAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [isTopNavVisible, setIsTopNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isCategoryBarShrunk, setIsCategoryBarShrunk] = useState(false);

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Premium Lager', price: 69, qty: 1 },
    { id: 2, name: 'Coca Cola', price: 29, qty: 2 },
  ]);

  const handleCartDrawerOpen = () => setCartDrawerOpen(true);
  const handleCartDrawerClose = () => setCartDrawerOpen(false);
  const handleRemoveCartItem = (id: number) => setCartItems(items => items.filter(item => item.id !== id));

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LocalShippingIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Delivery Options" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPos;
      setIsTopNavVisible(currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <Box sx={{ backgroundColor: '#F8F8F8' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          width: '100%',
        }}
      >
        <AppBar
          position="relative"
          elevation={0}  
          sx={{
            backgroundImage: `url(${bgHeader})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            height: '15vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                color: 'white',
                display: isTopNavVisible ? 'flex' : 'none',
                justifyContent: 'flex-end',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                paddingTop: 1,
                paddingRight: 7.5,
                gap: 2,
                transition: 'all 0.3s ease',
              }}
            >
              <IconButton size="small" color="inherit" sx={{ display: { xs: 'none', md: 'flex' } }}>
                <FeedbackIcon />
                <Box component="span" sx={{ marginLeft: 0.5, fontSize: '14px' }}>Give Feedback</Box>
              </IconButton>
              <IconButton size="small" color="inherit" sx={{ display: { xs: 'none', md: 'flex' } }}>
                <ContactSupportIcon />
                <Box component="span" sx={{ marginLeft: 0.5, fontSize: '14px' }}>Customer Care</Box>
              </IconButton>
              <IconButton size="small" color="inherit" sx={{ display: { xs: 'none', md: 'flex' } }}>
                <StoreIcon />
                <Box component="span" sx={{ marginLeft: 0.5, fontSize: '14px' }}>Store Locator</Box>
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1 }}>
                <IconButton size="small" color="inherit">
                  <LanguageIcon />
                </IconButton>
                <Box component="span" sx={{ marginLeft: 0.5, fontSize: '14px' }}>EN | 中 | 繁</Box>
              </Box>
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                position: 'relative',
                top: isTopNavVisible ? '0vh' : '-3vh',
                zIndex: 1,
                padding: '0 24px',
                transition: 'all 0.3s ease',
              }}
            >
              <Toolbar sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Logo />
                <SearchBar />
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 4 }}>
                  <Delivery />
                </Box>
                <Box sx={{ display: { xs: 'flex', sm: 'none' }, mb: 1 }}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>

                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                  <CartIconWithBadge onClick={handleCartDrawerOpen} count={cartItems.reduce((sum, item) => sum + item.qty, 0)} />
                  <IconButton size="small" edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
                    <PersonIcon fontSize="large" />
                  </IconButton>
                </Box>
              </Toolbar>
            </Box>
          </Box>
        </AppBar>

        <Box
          sx={{
            backgroundColor: '#ffffff',
            height: isTopNavVisible ? '7vh' : '5vh',
            width: '65vw',
            margin: '0 auto',
            position: 'relative',
            top: isTopNavVisible ? '-3.5vh' : '-5vh',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isTopNavVisible ? '0 16px' : '0 16px',
            borderRadius: isTopNavVisible ? '15px' : '15px 15px 0px 0px',
            transition: 'all 0.3s ease',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CategoriesBtn />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" sx={{ color: '#466BDC' }}>
              <YouTubeIcon fontSize='large'  />
            </IconButton>
            <IconButton size="small" sx={{ color: '#466BDC' }}>
              <InstagramIcon fontSize='large'  />
            </IconButton>
            <IconButton size="small" sx={{ color: '#466BDC' }}>
              <FacebookIcon fontSize='large'  />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ height: isTopNavVisible ? '22vh' : '19vh' }} />

      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <CartDrawer
        open={cartDrawerOpen}
        onClose={handleCartDrawerClose}
        cartItems={cartItems}
        onRemoveCartItem={handleRemoveCartItem}
        onUpdateQty={(id, qty) => setCartItems(items => items.map(item => item.id === id ? { ...item, qty } : item))}
      />
    </Box>
  );
}
import { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Chip, Tabs, Tab, MenuItem, Select, InputAdornment, Divider } from '@mui/material';
import ProductCard from '../components/main/ProductCard';
import product1 from '../components/res/product/product1.avif';
import product2 from '../components/res/product/product2.avif';
import product3 from '../components/res/product/product3.avif';
import product4 from '../components/res/product/product4.avif';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Footer from '~/components/main/Footer';
import { CartProvider } from '~/components/main/CartContext';
import PrimarySearchAppBar from '~/components/appbar';

const mockProducts = [
  {
    image: product1,
    brand: 'ASAHI',
    productName: "Beer Can 12's",
    price: 79,
    oldPrice: 79,
    tags: ['Alcoholic Beverages', 'BestSell', 'Crispy', 'Japan'],
    volume: '330MLX12',
    origin: 'Japan',
    promotion: 'Buy 2 for 150',
    promoDetail: '',
    description: 'Classic Japanese beer.','favorite': false,
  },
  {
    image: product2,
    brand: 'Brand B',
    productName: "Coffee Mix",
    price: 49,
    oldPrice: 59,
    tags: ['Instant Tea/ Coffee/ Milktea', 'Hong Kong', 'Promo', 'BestSell'],
    volume: '12X20g',
    origin: 'Hong Kong',
    promotion: 'Multiple Offers',
    promoDetail: '',
    description: 'Popular HK coffee mix.', 'favorite': false,
  },
  {
    image: product3,
    brand: 'Brand C',
    productName: "Green Tea Pack",
    price: 39,
    oldPrice: 45,
    tags: ['Instant Tea/ Coffee/ Milktea', 'USA', 'Healthy', 'Green'],
    volume: '10X30g',
    origin: 'USA',
    promotion: 'Buy 2 for 150',
    promoDetail: '',
    description: 'Refreshing green tea.', 'favorite': false,
  },
  {
    image: product4,
    brand: 'ASAHI',
    productName: "Super Dry Can",
    price: 69,
    oldPrice: 79,
    tags: ['Alcoholic Beverages', 'Japan', 'Promo', 'Limited'],
    volume: '330MLX12',
    origin: 'Japan',
    promotion: 'Multiple Offers',
    promoDetail: '',
    description: 'Limited edition dry beer.', 'favorite': false,
  },
];

const categories = [
  { label: 'Alcoholic Beverages', count: 2 },
  { label: 'Instant Tea/ Coffee/ Milktea', count: 2 },
];
const brands = ['ASAHI', 'Brand B', 'Brand C'];
const promotions = ['Buy 2 for 150', 'Multiple Offers'];
const origins = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
  'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
  'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei',
  'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon',
  'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
  'Comoros', 'Congo (Dem. Rep.)', 'Congo (Rep.)', 'Costa Rica', 'Croatia',
  'Cuba', 'Cyprus', 'Czechia', 'Denmark', 'Djibouti', 'Dominica',
  'Dominican Republic', 'Ecuador', 'Egypt'
];
const sortOptions = [
  { value: 'relevant', label: 'Most Relevant' },
  { value: 'low', label: 'Price Low to High' },
  { value: 'high', label: 'Price High to Low' },
];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState(0); 
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [sort, setSort] = useState('relevant');


  const chipOptions = [
    categories.map(cat => cat.label),
    brands,
    promotions,
    origins,
  ];


  const filteredChipOptions = chipOptions[selectedTab].filter(option =>
    option.toLowerCase().includes(search.toLowerCase())
  );
  let filtered = mockProducts.filter(p => {
    if (selectedValues.length === 0) return true;
    let filterMatch = false;
    for (const value of selectedValues) {
      if (selectedTab === 0 && p.tags && p.tags.includes(value)) filterMatch = true;
      if (selectedTab === 1 && p.brand === value) filterMatch = true;
      if (selectedTab === 2 && (p.promotion === value || (p.tags && p.tags.includes(value)))) filterMatch = true;
      if (selectedTab === 3 && p.origin === value) filterMatch = true;
    }
    return filterMatch;
  });
  if (sort === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price);


  return (
        <CartProvider>
          <Box sx={{ bgcolor: '#f5f5f5', py: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PrimarySearchAppBar />
    <Box sx={{ bgcolor: '#fafbfc', minHeight: '100vh', p: { xs: 1, md: 3 },borderRadius: 8 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Home {'>'} <span style={{ color: '#2B68F8', cursor: 'pointer' }}>Search Results</span>
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color:'black' }}>
        All Item Related to #BestSell
      </Typography>
      <Box sx={{ bgcolor: '#fff', borderRadius: 3, p: 2, mb: 2, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between'}}>
          <Tabs value={selectedTab} onChange={(_, v) => { setSelectedTab(v); setSelectedValues([]); setSearch(''); }} sx={{ minHeight: 40 }}>
            <Tab label="Category" />
            <Tab label="Brand" />
            <Tab label="Promotion" />
            <Tab label="Origin" />
          </Tabs>
          <TextField
            size="small"
            placeholder={`Search ${['category', 'brand', 'promotion', 'origin'][selectedTab]}...`}
            variant="outlined"
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              sx: { borderRadius: 2, bgcolor: '#f3f6fa', fontSize: 16 },
            }}
            sx={{ width: 160, ml: 2 }}
          />
        </Box> 
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 1, maxWidth: '62.8vw' }}>
          {filteredChipOptions.map(option => {
            const fakeCount = Math.floor(Math.random() * 20) + 1;
            return (
              <Box key={option} sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  label={option}
                  color={selectedValues.includes(option) ? 'primary' : 'default'}
                  onClick={() => {
                    setSelectedValues(prev =>
                      prev.includes(option)
                        ? prev.filter(val => val !== option)
                        : [...prev, option]
                    );
                  }}
                  sx={{ fontWeight: 500 }}
                />
                <Box
                  sx={{
                    ml: 1,
                    px: 1,
                    borderRadius: '12px',
                    fontSize: 14,
                    bgcolor: '#e3f0ff',
                    color: '#2196f3',
                    fontWeight: 600,
                    minWidth: 22,
                    textAlign: 'center',
                  }}
                >
                  {fakeCount}
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 4 }}>
          <Box sx={{ flex: 1 }} />
          <Typography sx={{ display: 'flex', alignItems: 'center', mr: 0.5, fontWeight: 700, fontSize: 18, color:'black' }}>
            <Box component="span" sx={{ color: '#2156C3', mr: 1, fontSize: 24, display: 'flex', alignItems: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="16" height="2" rx="1" fill="#2156C3"/><rect x="7" y="10" width="8" height="2" rx="1" fill="#2156C3"/><rect x="10" y="15" width="2" height="2" rx="1" fill="#2156C3"/></svg>
            </Box>
            Sort By
          </Typography>
          <Select
            size="small"
            value={sort}
            onChange={e => setSort(e.target.value)}
            sx={{ borderRadius: 2, fontWeight: 500, minWidth: 170, fontSize: 18 }}
          >
            {sortOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid
          container
          spacing={2}
          sx={{ 
            maxWidth: '65vw',
            minWidth: '61.7vw',
            width: '100%',
            margin: '0 auto',
          }}
        >
          {filtered.map((product, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    </Box>
    
    <Footer />
        </CartProvider>
  );
}

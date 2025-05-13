import { Box, Typography, Grid, Divider } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#363636', color: '#eee', pt: 4, pb: 2, px: { xs: 2, md: 8 } }}>
      <Grid container spacing={4} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>Download Now and Discover</Typography>
          <Typography variant="body2">[App Store] [Google Play]</Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#aaa' }}>
            Have you tried M&S? 掃碼立即下載
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>About Us</Typography>
          <Typography variant="body2">About PARKnSHOP</Typography>
          <Typography variant="body2">Corporate Details</Typography>
          <Typography variant="body2">Quality Assurance</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>Shopping</Typography>
          <Typography variant="body2">How To Shop Online</Typography>
          <Typography variant="body2">MoneyBack</Typography>
          <Typography variant="body2">Store Locator</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>Customer Service</Typography>
          <Typography variant="body2">Contact Us</Typography>
          <Typography variant="body2">FAQ</Typography>
          <Typography variant="body2">Store Related</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: '#444', mb: 2 }} />
      <Typography variant="caption" sx={{ color: '#bbb', mb: 1, display: 'block' }}>
        Under the law of Hong Kong, intoxicating liquor must not be sold or supplied to a minor (under 18) in the course of business. 根據香港法律，不得在業務過程中，向未成年人(18歲以下)售賣或供應令人醺醉的酒類。
      </Typography>
      <Typography variant="caption" sx={{ color: '#888', mb: 1, display: 'block' }}>
        © 2023 PNS.HK Online Store. All rights reserved.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, color: '#aaa', mt: 1, fontSize: 12 }}>
        <Typography variant="caption">Terms & Conditions</Typography>
        <Divider orientation="vertical" flexItem sx={{ borderColor: '#444' }} />
        <Typography variant="caption">Privacy Policy</Typography>
        <Divider orientation="vertical" flexItem sx={{ borderColor: '#444' }} />
        <Typography variant="caption">Disclaimer & Notice</Typography>
      </Box>
    </Box>
  );
}

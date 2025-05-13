import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, alt }) => {
  const [selected, setSelected] = useState(0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper sx={{ p: 1, borderRadius: 4, mb: 2, boxShadow: 3 }}>
        <Box
          component="img"
          src={images[selected]}
          alt={alt}
          sx={{ width: 320, height: 220, objectFit: 'contain', borderRadius: 3 }}
        />
      </Paper>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {images.map((img, idx) => (
          <Box
            key={img}
            component="img"
            src={img}
            alt={alt + ' thumbnail'}
            onClick={() => setSelected(idx)}
            sx={{
              width: 60,
              height: 60,
              objectFit: 'contain',
              borderRadius: 2,
              border: selected === idx ? '2px solid #1976d2' : '2px solid transparent',
              cursor: 'pointer',
              boxShadow: selected === idx ? 2 : 0,
              transition: 'border 0.2s, box-shadow 0.2s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductImageGallery;

import React, { useState } from 'react';
import { Box, Button, Popover, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AppsIcon from '@mui/icons-material/Apps';
import type { MenuItemType } from '../data/menuData';
import {menuData } from '../data/menuData';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Test2: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'categories-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleSelect = (item: MenuItemType) => {
    if (item.children) {
      setSelectedItem(item);
    } else {
      handleClose();
    }
  };

  return (
    <Box>
      <Button
        aria-describedby={id}
        variant="text"
        onClick={handleClick}
        sx={{
          height: '40px',
          minWidth: '120px',
          fontWeight: 750,
          fontSize: '1rem',
          textTransform: 'none',
          '.MuiButton-startIcon': {
            marginRight: '8px',
          },
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <AppsIcon fontSize='large' sx={{ 
          color: open ? '#466BDC' : '#b4b4b4', 
          paddingRight: '8px' 
        }} />
        <Typography fontSize='1.25rem' fontWeight={600} sx={{ 
          color: open ? '#466BDC' : '#b4b4b4', 
          marginRight: '8px' 
        }}>
          Category
        </Typography>
        <ExpandMoreIcon sx={{ 
          color: open ? '#466BDC' : '#b4b4b4', 
          fontSize: '1.25rem' 
        }} />
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            marginTop: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            maxWidth: '600px',
            p: 0,
            '.MuiPaper-root': {
              border: 'none',
            },
          },
        }}
        disableScrollLock={true}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 1 }}>
          <Box sx={{ minWidth: '200px', flex: '0 0 200px' }}>
            {menuData.map((item) => (
              <Box
                key={item.value}
                onClick={() => handleSelect(item)}
                sx={{
                  padding: '8px 16px',
                  color: '#333',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  '&:hover': {
                    color: '#466BDC',
                    backgroundColor: '#f5f5f5',
                  },
                  ...(selectedItem?.value === item.value && {
                    backgroundColor: '#f5f5f5',
                    color: '#466BDC',
                  }),
                  borderBottom: '1px solid #eee',
                }}
              >
                <span>{item.label}</span>
                {item.children && <KeyboardArrowRightIcon sx={{ color: '#466BDC' }} />}
              </Box>
            ))}
          </Box>

          {selectedItem && selectedItem.children && (
            <Box sx={{ minWidth: '200px', flex: '0 0 200px', ml: 2 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: '#466BDC',
                  mb: 1,
                  p: '4px 8px',
                  backgroundColor: '#fff',
                }}
              >
                {selectedItem.label}
              </Typography>
              {selectedItem.children.map((subItem) => (
                <Box
                  key={subItem.value}
                  onClick={() => handleSelect(subItem)}
                  sx={{
                    padding: '4px 8px',
                    color: '#333',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '&:hover': {
                      color: '#466BDC',
                      backgroundColor: '#f5f5f5',
                    },
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <span>{subItem.label}</span>
                  {subItem.children && <KeyboardArrowRightIcon sx={{ color: '#466BDC' }} />}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default Test2;
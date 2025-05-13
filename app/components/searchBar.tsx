import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 3, 
  backgroundColor: 'transparent', 
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: 'auto', 
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1, 
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    height: '4.8vh', 
  color: '#000000', 
  backgroundColor: '#FFFFFF', 
  borderRadius: theme.shape.borderRadius * 3, 
  width: '100%', 
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: '#466BDC', 
}));

export default function SearchBar() {
  return (
    <Search>
      <SearchIconWrapper>
        <StyledSearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}
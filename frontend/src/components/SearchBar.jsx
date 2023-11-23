import React from 'react'
import { Paper, IconButton } from "@mui/material"
import { Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
    let handleSearch = () => {
        
    }
    return (
       
      
    <Paper
      component="form"
        onSubmit={handleSearch}
      sx={{
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        pl: 2,
        boxShadow: "none",
         marginRight:"1em",
        width:"100%"
      }}
    >
      <input
        type="text"
        className="search-input"
        placeholder="#Explore the feed"
        style={{outline:"none",border:0}}
        
      />
      <IconButton
        type="submit"
        sx={{
          p: "10px",
          color: "gray",
        }}
      >
        <Search />
      </IconButton>
    </Paper>
  );
}

export default SearchBar
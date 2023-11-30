import React,{useState} from 'react'
import { Paper, IconButton } from "@mui/material"
import { Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";


const SearchBar = () => {
  let [search,setSearch]=useState("")
  let dispatch = useDispatch();

  let handleSearch = (e) => {
    e.preventDefault();
    dispatch({
      type: "searchTerm",
      searchTerm: search
    })
    setSearch("")
  };

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
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
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
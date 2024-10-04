import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import { API_SEARCH } from '../../services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authState, handle_variables } from '../login/Redux/authSlice';

function SearchBar() {
  const [open, setOpen] = useState(false);
  const[searchValue,setSearchValue] = useState("")
  const dispatch = useDispatch();
  let navigate = useNavigate()
  const { selectedCityId } = useSelector(authState);
  const toggleSearch = () => {
    setOpen(!open);
  };
  

  function handleSearch(){
    dispatch(handle_variables({ seachedValue : searchValue }))

   
    let body = {
        
    }

    let resp = API_SEARCH(searchValue ,body,selectedCityId)
      resp.then((res) => {
          if (res.status === 200) {
            console.log("search",res.data);
            dispatch(handle_variables({ searchResults: res.data }))
            navigate('/search')
  
          } else {
              console.log("false");        

          }
          })
              
  }
    

  return (
        <Box sx={{  display : "flex"}}>
          <IconButton onClick={toggleSearch}>
            <SearchIcon />
          </IconButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
             <Form.Group style={{ position: 'relative', display: 'flex', alignItems: 'center' }} id='search_box'>
                    <Form.Control
                        type="search"
                        placeholder="جستجو"
                        
                        style={{
                        borderRadius: '25px',
                        paddingRight: '40px', 
                        paddingBottom:"20px",
                        paddingTop:"15px",
                        height:"40px",
                        width:"300px",  
                        }}                      
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSearch(); 
                        }
                        }}
                    />
                   
                    </Form.Group>
          </Collapse>
        </Box>
  );
}

export default SearchBar;

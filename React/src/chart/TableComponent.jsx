import { useEffect, useState } from 'react';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Paper,} from '@mui/material';
import { AiTwotoneEdit } from "react-icons/ai";
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { IoEyeSharp } from "react-icons/io5";
import { PiToggleRight } from "react-icons/pi";
import { API_GETHOUSE , API_DELETE_HOUSE, API_TOGGLE_STATUS_BUILDING} from '../services/apiServices';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { Switch } from 'antd';

export default function TableComponent() {
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoadinging, setIsLoadinging] = useState(false);
  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const [houses, setHouses] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
    console.log(deleteModal);
    const [selectedHouseIdToggle, setSelectedHouseIdToggle] = useState(null);

    console.log(houses);
    
    const navigate = useNavigate()
    const rows = houses.map((item) => ({
        id: item.id,
        title: item.title,
        prioritized : item.prioritized
    }));
    const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    const fetchHouses = async () => {
        setIsLoading(true);
        try {
            const res = await API_GETHOUSE();
            if (res.status === 200) {
                setHouses(res.data);
                setFilteredRows(res.data.map((item) => ({
                    id: item.id,
                    title: item.title,
                    prioritized : item.prioritized
                })));
            } else {
                console.error("Error fetching houses");
            }
        } catch (error) {
            console.error("Error fetching houses:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchHouses();
}, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };


  const deleteHouse = async (id) => {
    setIsLoadinging(true);
    try {
        const res = await API_DELETE_HOUSE(id);
        if (res.status === 200) {
          toast.success("این آگهی با موفقیت حذف شد")
          setDeleteModal(false)
          setHouses(prevHouses => prevHouses.filter(house => house.id !== id));
          setFilteredRows(prevFilteredRows => prevFilteredRows.filter(house => house.id !== id));
            // setHouses(res.data);
            // setFilteredRows(res.data.map((item) => ({
            //     id: item.id,
            //     title: item.title,
            // })));
            setIsLoadinging(false);
          } else {
            setIsLoadinging(false);

            console.error("Error fetching houses");
        }
    } catch (error) {
      setIsLoadinging(false);

        console.error("Error fetching houses:", error);
    } finally {
      setIsLoadinging(false);
    }
};


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const result = rows.filter(row => row.id.toString() === searchInput.trim());
    setFilteredRows(result.length > 0 ? result : rows);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;


    const demoTheme = createTheme({
  
      palette: {
        mode: 'light', // You can also set to 'dark'
      },
      direction: 'rtl',
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      },
      components: {
        MuiDrawer: {
          styleOverrides: {
            paper: {
              width: '250px', // Customize sidebar width here
            },
          },
        }}
    });
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
      });

      const handleToggle = async (id,prioritized) => {
        console.log('Switch toggled, isLadder:', id);
       console.log(prioritized);
       
          const res = await API_TOGGLE_STATUS_BUILDING(id);
          if (res.status === 200) {
          console.log(res.data.prioritized);
          if(res.data.prioritized== 1){
            toast.success("این آگهی با موفقیت نردبان شد")

          }else{
            toast.success("این آگهی با موفقیت غیر نردبان شد")

          }
          
            //  res.prioritized
            
            } else {
  
              console.error("Error fetching houses");
          }
      }
      // catch (error) {
  
      // } finally {
      // }
      
       
    
  
  return (
      <>
   
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={demoTheme}>
        <Box sx={{ width: '100%' , marginTop:"20px" , borderRadius:"20px"}}>
        <Paper sx={{ width: '100%', mb: 2, p: 2 }}>

        <form onSubmit={handleSearchSubmit}>
        <Row className='d-flex justify-content-center'>

          <Col md={4}>
                <input
                    value={searchInput}
                    onChange={handleSearchChange}
                    type="text"
                    maxLength={11}
                    onKeyUp={(e) => {
                        const value = e.target.value;
                        if (isNaN(+value)) {
                            e.target.value = e.target.value.slice(
                                0, e.target.value.length - 1
                            );
                        }
                    }}
                    
                    placeholder={"جستجو بر اساس شناسه آگهی"}
                    className="form-control login-input"
                    // name="phone"
                                />
                                </Col>
                                </Row>
        </form>
      
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell  align="left">شناسه آگهی</TableCell>
                <TableCell  align="left">عنوان آگهی</TableCell>
                <TableCell align="left">جزییات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredRows
              ).map((row,index) => (
                <TableRow key={row.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white' , cursor:"pointer"}}>
                  <TableCell  align="left">{row.id}</TableCell>
                  <TableCell  align="left">{row.title}</TableCell>
                  <TableCell align="left" className='d-flex gap-2'>
                    <IoEyeSharp size={20} onClick={()=> navigate(`/admin/comments/${row.id}`)}/>
                    <MdDelete size={20} onClick={()=>{
                      setDeleteModal(true)
                      setSelectedHouseId(row.id); // Store the ID in state

                    }
                      }/>
                      <AiTwotoneEdit />
                      {/* <PiToggleRight /> */}
                     <Switch size="small" defaultChecked={row?.prioritized} onChange={()=>{
                      handleToggle(row?.id,row?.prioritized);
                      console.log(row);
                      
                      // setSelectedHouseIdToggle(row.id)
                    }}
                     />

                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="d-flex justify-content-center align-items-center">

        <TablePagination
    
            rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="تعداد ردیف‌ها در هر صفحه:" 
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} از ${count !== -1 ? count : `more than ${to}`}`
          } 
        />
        </div>
      </Paper>
    </Box>
       
        </ThemeProvider>
        </CacheProvider>
         {deleteModal && (
          <Modal
          className={"Auth-modal"}
          show={deleteModal}
          // onHide={setDeleteModal(false)}
          // size={"lg"}
          
          centered
      >
          <Modal.Body className="delete-modal">
            <Row className='d-flex justify-content-center'>آیا از حذف آگهی {selectedHouseId} اطمینان دارید؟</Row>
            <Row className="d-flex justify-content-center mt-3">
              <Col xs={6} md={4}>
                  <Button type="submit" className="sendcodeBtn" onClick={()=>deleteHouse(selectedHouseId)}>
                      {isLoadinging ? <BeatLoader size={9} color={"black"} /> : "حذف"} 
                  </Button>
              </Col>
                            <Col xs={6} md={4}>
                                <Button
                                    type="button"
                                    className="btn-login"
                                    onClick={() => {
                                       setDeleteModal(false)
                                    }}
                                >
                                    بستن 
                                </Button>  
                            </Col>
                        </Row>
            </Modal.Body>


            </Modal>
        )}
           </>
  );
}

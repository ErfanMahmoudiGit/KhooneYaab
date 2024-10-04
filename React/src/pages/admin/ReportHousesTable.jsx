import { useEffect, useState } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from '@mui/material';
import { Col, Container, Row } from 'react-bootstrap';
import { FaFilter } from "react-icons/fa6";
import ReportCard from './ReportCard';
import { API_GET_CATEGORIES_COUNT_STATE } from '../../services/apiServices';

export default function ReportHousesTable() {
  const [searchInput, setSearchInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let resp = await API_GET_CATEGORIES_COUNT_STATE();
        if (resp.status === 200) {
          console.log(resp.data);
          setRows(resp.data);
          setFilteredRows(resp.data); // Set filtered rows to be the same as rows initially
        } else {
          console.log("Error fetching data");  
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    let result = rows;
  
    // Apply search filter
    if (searchInput.trim()) {
      result = result.filter(row =>
        row.city.toLowerCase().includes(searchInput.trim().toLowerCase())
      );
    }
  
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(row =>
        row.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
  
    setFilteredRows(result);
    setPage(0); // Reset the page to 0 on filter change
  }, [searchInput, categoryFilter, rows]);
  
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    
    setCategoryFilter(e.target.value);
  };

  useEffect(() => {
    let result = rows;
  
    // Apply search filter based on city (allow partial match)
    if (searchInput.trim()) {
      result = result.filter(row =>
        row.city.toLowerCase().includes(searchInput.trim().toLowerCase())
      );
    }
  
    // Apply category filter (case insensitive)
    if (categoryFilter) {
      result = result.filter(row =>
        row.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
  
    setFilteredRows(result);
    setPage(0); // Reset the page to 0 on filter change
  }, [searchInput, categoryFilter, rows]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={demoTheme}>
        <Container className=''>
          <Box sx={{ width: '100%' , marginTop:"20px" , borderRadius:"20px"}}>
            <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
              <Row className='d-flex justify-content-center'>
                <Col md={4}>
                  <input
                    value={searchInput}
                    onChange={handleSearchChange}
                    type="text"
                    placeholder={"جستجو بر اساس نام شهر"}
                    className="form-control login-input"
                  />
                </Col>
                <Col md={4} className='d-flex align-items-center gap-3'>
                  <span className='d-flex gap-2'><FaFilter />فیلترها</span>
                  <select
                    value={categoryFilter}
                    onChange={handleCategoryChange}
                    className="form-control login-input"
                  >
                    <option value="">همه دسته‌ها</option>
                    <option value="اجارهٔ آپارتمان">اجاره آپارتمان</option>
                    <option value="اجارهٔ خانه و ویلا">اجاره خانه و ویلا</option>
                    <option value="فروش خانه و ویلا">فروش خانه و ویلا</option>
                    <option value="فروش آپارتمان">فروش آپارتمان</option>
                  </select>
                </Col>
              </Row>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell align="right">شناسه آگهی</TableCell> */}
                      <TableCell align="left">استان آگهی</TableCell>
                      <TableCell align="left">دسته‌بندی</TableCell>
                      <TableCell align="left">تعداد آگهی‌ها</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : filteredRows
                    ).map((row,index) => (
                      <TableRow key={row.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white' , cursor:"pointer"}}>
                        {/* <TableCell align="right">{row.id}</TableCell> */}
                        <TableCell align="left">{row.city}</TableCell>
                        <TableCell align="left">{row.category}</TableCell>
                        <TableCell align="left">{row.count}</TableCell> 
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
                  `${from}-${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`
                }
              />
                </div>

              
            </Paper>
          </Box>

        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}


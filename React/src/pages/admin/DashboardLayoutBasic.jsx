import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TableComponent from '../../chart/TableComponent';
import ReportCommentDetail from '../../chart/ReportCommentDetail';
import ReportHousesTable from './ReportHousesTable';
import SearchBar from './SearchBar';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'بخش اصلی',
  },
  {
    segment: 'dashboard',
    title: 'داشبورد',
    icon: <DashboardIcon />,
    path:"/admin/dashboard"
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'گزارشات',
  },
  {
    segment: 'reports',
    title: 'گزارشات',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'houses',
        title: 'استان ها',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'comments',
        title: 'نظرات',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'بازدیدها',
    icon: <LayersIcon />,
  },
];

const SIDEBAR_LOGO = {
    segment: 'logo',
    title: '', // You may leave it empty for no title
    icon: <img src="logo.png" style={{marginTop:"-10px"}} width={"150px"} height={"50px"} alt="MUI logo" />,
  };
// Add direction: 'rtl' to the theme creation
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
function DemoPageContent({ pathname }) {
  return (
    <div className=' p-5'>
        {pathname == '/dashboard' && <ReportCommentDetail />}
        {pathname == '/reports/houses' && <ReportHousesTable />}
        {pathname == '/reports/comments' && <TableComponent />}
        {pathname == '/comments/detail' && (<h2>det</h2>)}
      {/* <Typography>Dashboard content for {pathname}</Typography> */}
    </div>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
    const { window } = props;
    const [pathname, setPathname] = React.useState('/dashboard');
  
    const router = React.useMemo(() => {
      return {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path) => setPathname(String(path)),
      };
    }, [pathname]);
  
    const demoWindow = window !== undefined ? window() : undefined;
  
    return (
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={demoTheme}>
          <CssBaseline />
          <AppProvider
            branding={{
            //   logo: <div>hiiii</div>,
              logo: <div><SearchBar /></div>,
            //   logo: <img src="logo.png" alt="MUI logo" />,
              title: '',
            }}
            // navigation={[...NAVIGATION, SIDEBAR_LOGO]} // Add SIDEBAR_LOGO here

            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              {/* Custom Header */}
              <AppBar
                position="fixed"
                color="inherit"
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it sits above the sidebar
                  boxShadow: 'none', // Remove shadow if needed
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src="logo.png" alt="Brand Logo" style={{ height: '40px', marginRight: '16px' }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      Dashboard
                    </Typography>
                  </Box>
                  <TextField
                    variant="outlined"
                    placeholder="Search..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ width: '300px' }}
                  />
                </Toolbar>
              </AppBar>
  
              {/* Adjust the content to start below the fixed AppBar */}
              {/* <Container > */}
                <DashboardLayout
                  sx={{
                    '& .MuiDrawer-paper': {
                      width: '250px', // Customize sidebar width here
                    },
                  }}
                >
                  <DemoPageContent pathname={pathname} />
                  {/* <Outlet />  */}

                </DashboardLayout>
              {/* </Container> */}
            </Box>
          </AppProvider>
        </ThemeProvider>
      </CacheProvider>
    );
  }

  
  
DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;



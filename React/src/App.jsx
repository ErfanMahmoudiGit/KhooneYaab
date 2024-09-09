import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import "formik-stepper/dist/style.css";
import CreateHouse from './CreateHouse'
import Home from './pages/home/Home';
import HomeDetails from './pages/home/HomeDetails';
import SearchResults from './pages/home/SearchResults';
import Recommender from './pages/home/Recommender';
import NewLayout from './pages/home/NewLayout';
import Bookmarks from './pages/bookmarks/Bookmarks';
import CategoryPage from './pages/category/CategoryPage';
import MyRegistered from './pages/register_announcement/MyRegistered';
import SelectSellCategory from './pages/category/SelectSellCategory';
import SelectRentCategory from './pages/category/SelectRentCategory';
import AdminLayout from './pages/admin/AdminLayout';
import AdminReport from './pages/admin/AdminReport';
import Dashboard from './chart/ReportCommentDetail';
import DashboardLayoutBasic from './pages/admin/DashboardLayoutBasic';
import ReportHousesTable from './pages/admin/ReportHousesTable';
import TestLayout from './pages/home/TestLayout';
import FilterLayout from './pages/home/FilterLayout';
import SearchLayout from './pages/search/SearchLayout';
import ReportCommentDetail from './chart/ReportCommentDetail';
import TableComponent from './chart/TableComponent';
import AdminViews from './pages/admin/AdminViews';
// import ReportsTable from './pages/admin/ReportsTable';

function App() {

  return (
    <>
  
      <Routes>
        {/* <Route element={<NewLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path='/category/:category' element={<CategoryPage />}  />
            <Route path='/house/:id' element={<HomeDetails />}  />
            <Route path='/recommender' element={<Recommender />}  />
            <Route path='/register_announcement' element={<CreateHouse />}  />
            <Route path='/my_registered' element={<MyRegistered />}  />
            <Route path='/selectRentCategory' element={<SelectRentCategory />}  />
            <Route path='/selectSellCategory' element={<SelectSellCategory />}  />
            


        </Route> */}
        <Route element={<SearchLayout />}>
        <Route path="/search" element={<SearchResults />} />

        </Route>
        {/* <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Dashboard />} /> */}
        {/* <Route path="/admin" element={<AdminReport />} /> */}

        {/* </Route> */}
        {/* <Route path="/test" element={<DashboardLayoutBasic />}></Route> */}


        {/* <Route path="/admin" element={<DashboardLayoutBasic />}>
          <Route index element={<Dashboard />} />
          <Route path="reports">
            <Route path="comments" element={<ReportsTable />} /> 
          </Route>
        </Route> */}

        {/* <Route  path="/admin" element={<AdminLayout />} /> */}
        {/* <Route  path="/admin" element={<DashboardLayoutBasic />} /> */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<ReportCommentDetail />} />
          <Route path="comments" element={<TableComponent />} />
          <Route path="comments/:id" element={<ReportCommentDetail />} />
          <Route path="cities" element={<ReportHousesTable />} />
          <Route path="views" element={<AdminViews />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}

          {/* {pathname == '/dashboard' && <ReportCommentDetail />}
        {pathname == '/reports/houses' && <ReportHousesTable />}
        {pathname == '/reports/comments' && <TableComponent />} */}

          {/* <Route path="cities" element={<Cities />} />
          <Route path="comments" element={<Comments />} />
          <Route path="views" element={<Views />} /> */}
          {/* Add other routes here */}
        </Route>

        <Route element={<TestLayout />}>
    
        <Route path="/" element={<Home />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path='/category/:category' element={<CategoryPage />}  />
            <Route path='/house/:id' element={<HomeDetails />}  />
            <Route path='/recommender' element={<Recommender />}  />
            <Route path='/register_announcement' element={<CreateHouse />}  />
            <Route path='/my_registered' element={<MyRegistered />}  />
            <Route path='/selectRentCategory' element={<SelectRentCategory />}  />
            <Route path='/selectSellCategory' element={<SelectSellCategory />}  />
        </Route>





        {/* {/* <Route index element={<Dashboard />} /> 
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reports/comments" element={<ReportsTable />} />
      </Route>
      <Route path="reports/comments" element={<ReportsTable />} /> 


        {/* <Route path="/test" element={<DashboardLayoutBasic />} /> */}

      </Routes>

    
    </>
  )
}

export default App



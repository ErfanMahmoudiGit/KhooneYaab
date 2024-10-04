import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import "formik-stepper/dist/style.css";
import CreateHouse from './CreateHouse'
import Home from './pages/home/Home';
import HomeDetails from './pages/home/HomeDetails';
import SearchResults from './pages/home/SearchResults';
import Recommender from './pages/home/Recommender';
import Bookmarks from './pages/bookmarks/Bookmarks';
import CategoryPage from './pages/category/CategoryPage';
import MyRegistered from './pages/register_announcement/MyRegistered';
import SelectSellCategory from './pages/category/SelectSellCategory';
import SelectRentCategory from './pages/category/SelectRentCategory';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './chart/ReportCommentDetail';
import ReportHousesTable from './pages/admin/ReportHousesTable';
import TestLayout from './pages/home/TestLayout';
import SearchLayout from './pages/search/SearchLayout';
import ReportCommentDetail from './chart/ReportCommentDetail';
import TableComponent from './chart/TableComponent';
import DefaultDashboard from './pages/admin/DefaultDashboard';

function App() {

  return (
    <>
      <Routes>
        <Route element={<SearchLayout />}>
          <Route path="/search" element={<SearchResults />} />
        </Route>
       
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DefaultDashboard />} />
          <Route path="comments" element={<TableComponent />} />
          <Route path="comments/:id" element={<ReportCommentDetail />} />
          <Route path="cities" element={<ReportHousesTable />} />
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
      </Routes>
    </>
  )
}

export default App



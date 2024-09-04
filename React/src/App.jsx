import { Route, Routes } from 'react-router-dom'
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
import FilterLayout from './pages/home/FilterLayout';
import MyRegistered from './pages/register_announcement/MyRegistered';
import SelectSellCategory from './pages/category/SelectSellCategory';
import SelectRentCategory from './pages/category/SelectRentCategory';
import AdminLayout from './pages/admin/AdminLayout';
import AdminReport from './pages/admin/AdminReport';
import Dashboard from './chart/Dashboard';

function App() {

  return (
    <>
  
      <Routes>
        <Route element={<NewLayout />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/search" element={<SearchResults />} /> */}
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path='/category/:category' element={<CategoryPage />}  />
            <Route path='/house/:id' element={<HomeDetails />}  />
            <Route path='/recommender' element={<Recommender />}  />
            <Route path='/register_announcement' element={<CreateHouse />}  />
            <Route path='/my_registered' element={<MyRegistered />}  />
            <Route path='/selectRentCategory' element={<SelectRentCategory />}  />
            <Route path='/selectSellCategory' element={<SelectSellCategory />}  />
            


        </Route>
        <Route element={<FilterLayout />}>
        <Route path="/search" element={<SearchResults />} />

        </Route>
        <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        {/* <Route path="/admin" element={<AdminReport />} /> */}

        </Route>
{/* <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/:selectedcity" element={<CityResults />} />
            <Route path='/category="فروش آپارتمان"' element={<BuyApartment />}  />

        </Route> */}
        {/* <Route path='/register_announcement' element={<CreateHouse />}  /> */}
        {/* <Route path='/recommender' element={<Recommender />}  /> */}
      </Routes>

    
    </>
  )
}

export default App



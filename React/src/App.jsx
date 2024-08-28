import { Route, Routes } from 'react-router-dom'
import './App.css'
import "formik-stepper/dist/style.css";
import CreateHouse from './CreateHouse'
import Home from './pages/home/Home';
import HomeDetails from './pages/home/HomeDetails';
import HomeLayout from './pages/home/HomeLayout';
import SearchResults from './pages/home/SearchResults';
import CityResults from './pages/home/CityResults';
import Recommender from './pages/home/Recommender';
import NewLayout from './pages/home/NewLayout';
import Bookmarks from './pages/bookmarks/Bookmarks';
import CategoryPage from './pages/category/CategoryPage';
import FilterLayout from './pages/home/FilterLayout';

function App() {

  return (
    <>
  
      <Routes>
        <Route element={<NewLayout />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/search" element={<SearchResults />} /> */}
            <Route path="/:selectedcity" element={<CityResults />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path='/category/:category' element={<CategoryPage />}  />
            <Route path='/house/:id' element={<HomeDetails />}  />
        </Route>
        <Route element={<FilterLayout />}>
        <Route path="/search" element={<SearchResults />} />

        </Route>
{/* <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/:selectedcity" element={<CityResults />} />
            <Route path='/category="فروش آپارتمان"' element={<BuyApartment />}  />

        </Route> */}
        <Route path='/register_announcement' element={<CreateHouse />}  />
        <Route path='/recommender' element={<Recommender />}  />
      </Routes>

    
    </>
  )
}

export default App



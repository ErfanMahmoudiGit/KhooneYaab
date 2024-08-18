import { Route, Routes } from 'react-router-dom'
import './App.css'
import "formik-stepper/dist/style.css";
import CreateHouse from './CreateHouse'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import HomeDetails from './pages/home/HomeDetails';
import BuyApartment from './pages/category/BuyApartment';
import HomeLayout from './pages/home/HomeLayout';
import SearchResults from './pages/home/SearchResults';
import CityResults from './pages/home/CityResults';
import Recommender from './pages/home/Recommender';

function App() {

  return (
    <>
  
      <Routes>
        <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/:selectedcity" element={<CityResults />} />
            <Route path='/category="فروش آپارتمان"' element={<BuyApartment />}  />

        </Route>
        {/* <Route path='/' element={<Home />}  /> */}
        <Route path='/register_announcement' element={<CreateHouse />}  />
        <Route path='/login' element={<Login />}  />
        <Route path='/house/:id' element={<HomeDetails />}  />
        <Route path='/recommender' element={<Recommender />}  />
        {/* <Route path='/category="فروش آپارتمان"' element={<BuyApartment />}  /> */}
        {/* <Route path='/category="فروش خانه و ویلا"' element={<BuyApartment />}  />
        <Route path='/category="اجاره آپارتمان"' element={<BuyApartment />}  />
        <Route path='/category="اجاره خانه و ویلا"' element={<BuyApartment />}  /> */}
      </Routes>

    
    </>
  )
}

export default App

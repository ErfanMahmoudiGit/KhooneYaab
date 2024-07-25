import { Route, Routes } from 'react-router-dom'
import './App.css'
import "formik-stepper/dist/style.css";
import CreateHouse from './CreateHouse'

function App() {

  return (
    <div>
      
      <Routes>
      {/* <Route path='/' element={<NewFoem />}  /> */}
      <Route path='/create_house' element={<CreateHouse />}  />
      </Routes>


    </div>
    
  )
}

export default App

import { Button, Col, Row ,Container} from "react-bootstrap"
import { MdApartment } from "react-icons/md";
import { FcHome } from "react-icons/fc";

import {useNavigate } from 'react-router-dom';

export default function ReportCard({text}){
    const navigate = useNavigate()

    return(
        <>
            <div  className="text-center d-flex flex-column justify-content-center align-items-center card-bookmark"
                style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', height:"200px",backgroundColor:"#ffffff",
                boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)"}}
                onClick={()=>{navigate('/category/RentHome')}}
                >
                    <FcHome size={80} className='p-2 text-white' />
                <span className='fw-bold text-center'>{text}</span>
            </div>
          
        </>
        
    )
}


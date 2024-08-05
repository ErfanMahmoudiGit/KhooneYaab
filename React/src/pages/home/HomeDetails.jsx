import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_GETHOUSE_DETAILS } from "../../services/apiServices";

export default function HomeDetails() { 
    const p =useParams()
    console.log(p.id);
    useEffect(()=>{
        let resp = API_GETHOUSE_DETAILS(p.id)
        resp.then((res) => {
            console.log("res: ",res);
            
            if (res.status === 200) {
                console.log("success");        
                console.log(res.data);  
                // setHouses(res.data)      
            } else {
                console.log("false");        
            }
        })
    },[])
    
    return(
        <>
        <div>detail page</div>
        
        </>
    )
}
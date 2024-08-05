import { useEffect } from "react";
import { API_CATEGORY } from "../../services/apiServices";

export default function BuyApartment(){
    
    useEffect(() => {
        let resp = API_CATEGORY({category:"فروش آپارتمان"})
        // let resp = API_CATEGORY({category:"فروش آپارتمان"})
        resp.then((res) => {
            console.log("فروش آپارتمان",resp);
            
            if (res.status === 200) {
                console.log("success");        
                console.log(res.data);  
            } else {
                console.log("false");        
            }
        })
    }, [])
    return(
        <div>BuyApartment</div>
    )
}
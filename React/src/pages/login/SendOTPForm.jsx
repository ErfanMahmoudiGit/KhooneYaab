import Loading from "../../ui/Loading"
import { API_GETOTP} from "../../services/apiServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SendOTPForm(){
    // {register , sendOtpHandler ,isSendingOtp}
    
   
    let required = true;
    const[phoneNumber,setPhoneNumber] = useState("")
    console.log(phoneNumber);
    function sendOTPHandler(){
        event.preventDefault()
        console.log(phoneNumber);

        console.log("send clicked");

        let data = {
            "phoneNumber" : phoneNumber
        }
        let resp = API_GETOTP(data)
            resp.then((res) => {
                console.log(res);
                if (res.status === 200) {
                    console.log("successfully sent");      
                      
                } else {
                    console.log("not sent");        

                }
            })
                
    }

    return(
        <div>
            <form className="space-y-8" onSubmit={sendOTPHandler}>
            {/* <form className="space-y-8" onSubmit={sendOtpHandler}> */}
            {/* <input label="شماره موبایل" name="phoneNumber"/> */}
            <div>
            <label className="mb-2 block text-primary-700" >
                شماره موبایل {required && <span className="text-error">*</span>}
            </label>
            <input type={"text"} id={"phoneNumber"} value={phoneNumber} 
             onChange = {(e)=> setPhoneNumber(e.target.value)}                  
            />
        </div>
                
                <div>
                <button type="submit" onClick={sendOTPHandler} className="btn btn--primary w-full">ارسال کد تایید</button>

                 
                </div>
            </form>
        </div>
    )
}
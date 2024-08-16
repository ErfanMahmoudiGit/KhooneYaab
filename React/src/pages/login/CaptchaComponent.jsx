import {React, useEffect} from "react";
import { FormControl} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {authState, handle_variables, loadCaptchaImage} from "./Redux/authSlice";

const CaptchaComponent = (props) => {
    const state = useSelector(authState)
    const dispatch = useDispatch();

  
    useEffect(()=>{
        createCaptcha();
    },[])
    const createCaptcha = () => {
        if(props.disabled !== true) dispatch(loadCaptchaImage());
    }
    return <section>
        <div className={'captcha-panel'}>
            <div className={'text-center'}>
                <FormControl
                    placeholder={'کد امنیتی'}
                    type='number'
                    disabled={props.disabled}
                    className={'default-input-box'+(state.invalid_captcha===false?"":" invalid")}
                    onChange={(e) => {
                        dispatch(handle_variables({
                            invalid_captcha:false,
                            captcha_text:e.target.value
                        }))
                    }}
                    onKeyDown={props.handleKeyDown?props.handleKeyDown:null}
                    data-message-required={'لطفا کد امنیتی را وارد کنید'}
                    value={state.captcha_text}
                />
                {state.invalid_captcha && <small className={'text-danger'}>لطفا کد امنیتی را وارد کنید</small>}
            </div>
            <div className="d-flex">
            <div className={"refresh-captcha pointer-cursor mt-2 bg-refresh ms-2"}
                 // src={"/asset/img/refresh.png"}
                 style={{maxWidth:30}}
                 onClick={createCaptcha}
            />
            <img src={"data:image/png;base64, "+state.captcha_image}
                 style={{maxWidth:185,borderRadius:30}}
                 alt="در حال بارگذاری کد امنیتی ..." />      
            </div> 
        </div>
    </section>
}

export {CaptchaComponent};

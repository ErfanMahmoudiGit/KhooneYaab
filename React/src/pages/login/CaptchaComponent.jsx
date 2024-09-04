import React, { useEffect, useRef } from "react";
import { FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authState, handle_variables, loadCaptchaImage } from './Redux/authSlice';

const CaptchaComponent = (props) => {
    const canvasRef = useRef(null);
    const dispatch = useDispatch();
    const { loginModalStep1 ,user_string,isSendCode , phoneNumver , captcha_ref , captcha_image , invalid_captcha, captcha_string} = useSelector(authState);

    useEffect(()=>{
        createCaptcha();
    },[])
    const createCaptcha = () => {
        if(props.disabled !== true) dispatch(loadCaptchaImage());
    }
    useEffect(() => {
        drawCaptcha();
    }, [captcha_string]); // Redraw when captcha_string changes

    const drawCaptcha = () => {
        const canvas = canvasRef.current;
        if (!canvas || !captcha_string) return;

        const ctx = canvas.getContext("2d");
        canvas.width = 185; // Set desired width
        canvas.height = 50; // Set desired height

        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set styles
        ctx.fillStyle = "#f0f0f0"; // Background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "italic 30px 'Pacifico', cursive"; // Font size and type
        ctx.fillStyle = "#000"; // Text color
        ctx.textAlign = "center";
        ctx.f
        ctx.textBaseline = "middle";
        
        // Draw the captcha string
        ctx.fillText(captcha_string, canvas.width / 2, canvas.height / 2);
    };

    return (
        <section>
            <div className="captcha-panel">
                <div className="text-center">
                    <FormControl
                        placeholder={'کد امنیتی'}
                        type='text' // Changing type to text for better input matching (instead of number)
                        disabled={props.disabled}
                        className={' default-input-box' + (invalid_captcha ? " invalid" : "")}
                        onChange={(e) => {
                            dispatch(handle_variables({
                                invalid_captcha: false,
                                user_string: e.target.value
                            }));
                        }}
                        value={user_string}
                    />
                    {invalid_captcha && <small className="text-danger">لطفا کد امنیتی را وارد کنید</small>}
                </div>
                <div className="d-flex">
            <div className={"refresh-captcha pointer-cursor mt-2 bg-refresh ms-2"}
                 // src={"/asset/img/refresh.png"}
                 style={{maxWidth:30}}
                 onClick={createCaptcha}
            />
          
            </div> 
                <div className="d-flex">
                    <canvas ref={canvasRef} style={{ maxWidth: 185, borderRadius: 30 }} />
                </div>
            </div>
        </section>
    );
};

export { CaptchaComponent };

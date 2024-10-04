import { useEffect, useState } from "react";
import { API_GETHOUSE_DETAILS } from "../../services/apiServices";
import { BeatLoader } from "react-spinners";
import { FaChevronLeft, FaBookmark } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { Button} from "react-bootstrap";
import {truncateText} from '../../utils/util'
export default function Bookmarks() {
    const [detail, setDetail] = useState([]);
    const [id, setID] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        // Retrieve bookmarked IDs from localStorage
        const bookmarks = localStorage.getItem('BOOKMARKS');
        setID(bookmarks ? JSON.parse(bookmarks) : []);
    }, []);
    useEffect(() => {
        const fetchHouseDetails = async () => {
            if (id.length > 0) {
                setIsLoading(true);
                try {
                    const details = await Promise.all(
                        id.map(houseId => API_GETHOUSE_DETAILS(houseId))
                    );
                    
                    const validDetails = details
                        .filter(res => res.status === 200)
                        .map(res => res.data);

                    setDetail(validDetails);
                } catch (error) {
                    console.error("Error fetching house details:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setDetail([]); // Clear details if no IDs
            }
        };

        fetchHouseDetails();
    }, [id]);

    function formatNumber(number) {
        let formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return formatted.replace(/\d/g, (digit) => persianDigits[digit]);
    }

    const handleUnbookmark = (houseId) => {
        const updatedIDs = id.filter(item => item !== houseId);
        setID(updatedIDs);
        localStorage.setItem('BOOKMARKS', JSON.stringify(updatedIDs));
    };

    return (
        <>  
            <div className="d-flex flex-row justify-content-between m-3 align-items-center">
                <h3>نشان شده ها</h3>
                <Button className="backprimaryButton" onClick={()=> navigate('/')}>بازگشت به صفحه اصلی</Button>
            </div>

         
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <BeatLoader />
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                    {detail.length == 0 ? (
                        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' , marginTop:"20px"}}>
                              هیچ آگهی نشان شده ای وجود ندارد
                        </div>
                    ):(
                        detail.map((house, index) => (
                            <div key={index} className="d-flex flex-column justify-contemt-center align-items-center card-bookmark"
                            style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px',
                            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",backgroundColor:"#ffffff"
                             }}>
                                <div className="d-flex justify-content-center position-relative">
                                    <img
                                        src={house.image ? house.image : '/1.png'}
                                        style={{ width: "190px", height: "190px", maxHeight: "190px" }}
                                        className="border border-light rounded"
                                        alt={house.title}
                                    />
                                                
                                    <FaBookmark
                                        onClick={() => handleUnbookmark(house.id)}
                                        size={28}
                                        style={{
                                            position: 'absolute',
                                            top: '-4px',
                                            left: '-8px',
                                            color: '#d64444',
                                            fontSize: '42px',
                                            // color: '#ac2323',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            borderRadius: '50%',
                                            padding: '4px'
                                        }}
                                    />
                                                
                                </div>

                                <h3 style={{ fontSize: '18px', marginTop: '12px' }}>{truncateText(house.title)}</h3>
                                <div style={{ fontSize: '14px', color: '#666' }}>آگهی در {house.city}</div>
                                <div style={{ fontSize: '14px', color: '#666' }}>املاک <FaChevronLeft size={12} /> {house.category}</div>
                                <div style={{ fontSize: '14px', color: '#666' }}>{formatNumber(house.price)} تومان</div>
                                <button onClick={() => navigate(`/house/${house.id}`)} className="primaryButton"> مشاهده ملک</button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </>
    );
}

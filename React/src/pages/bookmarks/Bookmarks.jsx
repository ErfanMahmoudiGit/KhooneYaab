import { useEffect, useState } from "react";
import { API_GETHOUSE_DETAILS } from "../../services/apiServices";
import { BeatLoader } from "react-spinners";
import { FaChevronLeft, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

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
        if (id.length > 0) {
            // Fetch details for each bookmarked ID
            setIsLoading(true)
            const fetchHouseDetails = async () => {
                try {
                    const details = await Promise.all(
                        id.map(houseId => API_GETHOUSE_DETAILS(houseId))
                    );
                    
                    const validDetails = details
                        .filter(res => res.status === 200)
                        .map(res => res.data);

                    setDetail(validDetails);
                    setIsLoading(false)

                } catch (error) {
                    setIsLoading(false)

                    console.error("Error fetching house details:", error);
                }
            };

            fetchHouseDetails();
        }
    }, [id]);

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <>
            <h2>نشان شده ها</h2>
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
                            <div key={index} className="d-flex flex-column justify-contemt-center align-items-center" style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{house.title}</h3>
                                <img style={{width:"150px" , height:"150px" , borderRadius: '8px'}} src={house.image ? house.image : '/1.png'}></img>
                                <div style={{ fontSize: '14px', color: '#666' }}>آگهی در {house.city}</div>
                                <div style={{ fontSize: '14px', color: '#666' }}>املاک <FaChevronLeft size={12} /> {house.category}</div>


                                <p style={{ fontSize: '14px', color: '#666' }}>{formatNumber(house.price)} تومان</p>
                                <button onClick={() => navigate(`/house/${house.id}`)} className="smsButton"> مشاهده ملک</button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </>
    );
}

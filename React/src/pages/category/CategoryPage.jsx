import { useEffect, useState, useRef } from "react";
import { API_CATEGORY } from "../../services/apiServices";
import { BeatLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft } from 'react-icons/fa';
import { authState } from "../login/Redux/authSlice";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { TbArrowsSort } from "react-icons/tb";

export default function CategoryPage() {
    const [houses, setHouses] = useState([]);
    const [displayedHouses, setDisplayedHouses] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sortOrder, setSortOrder] = useState(''); // New state for sorting
    const [dateOrder, setDateOrder] = useState(''); // State for date sorting

    const loadMoreRef = useRef(null);
    const navigate = useNavigate();
    const { category } = useParams();
    const {  selectedCityId } = useSelector(authState);
    
    let cat;
    if (category === 'BuyApartment') {
        cat = "فروش آپارتمان";
    } else if (category === 'RentApartment') {
        cat = "اجارهٔ آپارتمان";
    } else if (category === 'BuyHome') {
        cat = "فروش خانه و ویلا";
    } else if (category === 'RentHome') {
        cat = "اجارهٔ خانه و ویلا";
    } else {
        cat = "";
    }
    const fetchHouses = async () => {
        setIsLoading(true);
        try {
            const res = await API_CATEGORY({ category: cat , state : selectedCityId});
            if (res.status === 200) {
                setHouses(res.data);
                setDisplayedHouses(res.data.slice(0, 12)); // Display the first 12 houses
            } else {
                console.error("Error fetching houses");
            }
        } catch (error) {
            console.error("Error fetching houses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHouses();
    }, [selectedCityId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoadingMore && displayedHouses.length < houses.length) {
                    loadMoreHouses();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [displayedHouses, houses, isLoadingMore]);

    const loadMoreHouses = () => {
        if (isLoadingMore) return; // Prevent multiple simultaneous loads
        setIsLoadingMore(true);

        setTimeout(() => { // Simulate loading delay
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 12;
                const newHouses = houses.slice(prevIndex, nextIndex);
                setDisplayedHouses(prevHouses => [...prevHouses, ...newHouses]);
                return nextIndex;
            });
            setIsLoadingMore(false);
        }, 1000); // Simulated delay for demonstration
    };

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const handleSortChange = (selectedSort) => {
        setSortOrder(selectedSort);
        sortHouses(selectedSort, dateOrder);
    };
    
    // Adjusted function to handle date change with direct parameters
    const handleDateChange = (selectedDateOrder) => {
        setDateOrder(selectedDateOrder);
        sortHouses(sortOrder, selectedDateOrder);
    };
    
  
    const sortHouses = (priceOrder, dateOrder) => {
        let sortedHouses = [...houses];

        if (priceOrder === 'price-asc') {
            sortedHouses.sort((a, b) => a.price - b.price);
        } else if (priceOrder === 'price-desc') {
            sortedHouses.sort((a, b) => b.price - a.price);
        }

        if (dateOrder === 'date-asc') {
            sortedHouses.sort((a, b) => new Date(a.time) - new Date(b.time)); // Ensure 'date' exists
        } else if (dateOrder === 'date-desc') {
            sortedHouses.sort((a, b) => new Date(b.time) - new Date(a.time));
        }

        setDisplayedHouses(sortedHouses.slice(0, currentIndex + 12));
    };

    // function truncateText(text) {
    //     return text.length > 10 ? `${text.slice(0, 23)}...` : text;
    // }
    function truncateText(text, maxLength = 23) {
        if (text.length <= maxLength) return text;
    
        // Find the index of the last space within the maxLength limit
        const indexOfLastSpace = text.lastIndexOf(' ', maxLength);
    
        // If no space is found within the limit, just truncate at the maxLength
        const truncateIndex = indexOfLastSpace === -1 ? maxLength : indexOfLastSpace;
    
        return `${text.slice(0, truncateIndex)}...`;
    }
    
    return (
        <>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <BeatLoader />
                </div>
            ) : (
                <>
                    <div className="d-flex justify-content-between align-items-center m-3">
                            <h5 >آگهی های {cat}</h5>
                        <div className="d-flex align-items-center gap-4">
                            <div className="d-flex align-items-center gap-3 sort-background">
                                <div>مرتب سازی بر اساس{" "}<TbArrowsSort /></div>
                                {/* sort-item-active */}
                                <div className={`sort-item ${sortOrder === 'price-asc' ? 'sort-item-active' : ''}`} 
                                    onClick={() => handleSortChange('price-asc')}>کم ترین قیمت</div>
                                <div className={`sort-item ${sortOrder === 'price-desc' ? 'sort-item-active' : ''}`} 
                                    onClick={() => handleSortChange('price-desc')}>بیشترین قیمت</div>
                                <div className={`sort-item ${dateOrder === 'date-asc' ? 'sort-item-active' : ''}`} 
                                     onClick={() => handleDateChange('date-asc')}>قدیمی ترین</div>
                                <div className={`sort-item ${dateOrder === 'date-desc' ? 'sort-item-active' : ''}`} 
                                    onClick={() => handleDateChange('date-desc')}>جدید ترین</div>
                            </div>
                           
                        </div>
                        <Button className="backprimaryButton" onClick={()=> navigate('/')}>بازگشت به صفحه اصلی</Button>
                    </div>
                    

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                        {displayedHouses.length === 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', marginTop: "20px" }}>
                                هیچ آگهی در این دسته بندی وجود ندارد
                            </div>
                        ) : (
                            displayedHouses.map((house, index) => (
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
                    {isLoadingMore && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                            <BeatLoader />
                        </div>
                    )}
                    <div ref={loadMoreRef} className="load-more" style={{ height: '20px' }}></div>
                </>
            )}
        </>
    );
}


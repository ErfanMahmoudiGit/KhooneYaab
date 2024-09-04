import { useRef } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authState } from "../login/Redux/authSlice"; 
import { useSelector } from "react-redux";
import { FaChevronLeft, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { TbArrowsSort } from "react-icons/tb";

const SearchResults = () => {
    const navigate = useNavigate();
    const [loading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedHouses, setDisplayedHouses] = useState([]);
    const [sortOrder, setSortOrder] = useState(''); // New state for sorting
    const [dateOrder, setDateOrder] = useState(''); // State for date sorting

    const { loginModalStep1  , searchResults , seachedValue} = useSelector(authState);
    const loadMoreRef = useRef(null);
    useEffect(()=>{
        setDisplayedHouses(searchResults.slice(0, 12)); // Display the first 12 houses

    },[searchResults])
    const loadMoreHouses = () => {
        if (isLoadingMore) return; // Prevent multiple simultaneous loads
        setIsLoadingMore(true);

        setTimeout(() => { // Simulate loading delay
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 12;
                const newHouses = searchResults.slice(prevIndex, nextIndex);
                setDisplayedHouses(prevHouses => [...prevHouses, ...newHouses]);
                return nextIndex;
            });
            setIsLoadingMore(false);
        }, 1000); // Simulated delay for demonstration
    };
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoadingMore && displayedHouses.length < searchResults.length) {
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
    }, [displayedHouses, searchResults, isLoadingMore]);

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    function truncateText(text) {
        return text.length > 10 ? `${text.slice(0, 23)}...` : text;
    }

    const handleSortChange = (selectedSort) => {
        setSortOrder(selectedSort);
        sortHouses(selectedSort, dateOrder);
    };
    const handleDateChange = (selectedDateOrder) => {
        setDateOrder(selectedDateOrder);
        sortHouses(sortOrder, selectedDateOrder);
    };
    const sortHouses = (priceOrder, dateOrder) => {
        let sortedHouses = [...displayedHouses];

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
    const getBookmarks = () => {
        const bookmarks = localStorage.getItem('BOOKMARKS');
        return bookmarks ? JSON.parse(bookmarks) : [];
    };
    const toggleBookmark = (houseId) => {
        const bookmarks = getBookmarks();
        const updatedBookmarks = bookmarks.includes(houseId)
            ? bookmarks.filter((id) => id !== houseId)
            : [...bookmarks, houseId];

        localStorage.setItem('BOOKMARKS', JSON.stringify(updatedBookmarks));

        setDisplayedHouses(
            displayedHouses.map((house) =>
                house.id === houseId
                    ? { ...house, isBookmarked: !bookmarks.includes(houseId) }
                    : house
            )
        );
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center m-3">
                <h4>نتایج جستجو برای <span style={{ color: '#ac2323' , fontWeight:"bold" }}>{seachedValue}</span></h4>
                    <div className="d-flex align-items-center gap-4">
                        <div className="d-flex align-items-center gap-3 sort-background">
                            <div>مرتب سازی بر اساس{" "}<TbArrowsSort /></div>
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
            
         
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <BeatLoader />
                </div>
            ) : (
                <>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
               {displayedHouses.length == 0 ? (
                        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' , marginTop:"20px"}}>
                              هیچ آگهی با عنوان خواسته شده یافت نشد
                        </div>
                    ):(
                        displayedHouses.map((house, index) => {
                            const isBookmarked = getBookmarks().includes(house.id);

                            return(

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
                                                    {isBookmarked ? (
                                                        <FaBookmark
                                                            onClick={() => toggleBookmark(house.id)}
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
                                                    ) : (
                                                        <FaRegBookmark
                                                            onClick={() => toggleBookmark(house.id)}
                                                            size={28}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '-4px',
                                                                left: '-8px',
                                                                color: 'white',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                                borderRadius: '50%',
                                                                padding: '4px'
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                    {/* <div className="d-flex justify-content-center position-relative">
                                                    <img
                                                        src={house.image ? house.image : '/1.png'}
                                                        style={{ width: "190px", height: "190px", maxHeight: "190px" }}
                                                        className="border border-light rounded"
                                                        alt={house.title}
                                                    />
                                                    
                                                        <FaBookmark
                                                            onClick={() => toggleBookmark(house.id)}
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
                                                    
                                                </div> */}
                                        <h3 style={{ fontSize: '18px', marginTop: '12px' }}>{truncateText(house.title)}</h3>
                                    <div style={{ fontSize: '14px', color: '#666' }}>آگهی در {house.city}</div>
                                    <div style={{ fontSize: '14px', color: '#666' }}>املاک <FaChevronLeft size={12} /> {house.category}</div>
                                    <div style={{ fontSize: '14px', color: '#666' }}>{formatNumber(house.price)} تومان</div>
                                    <button onClick={() => navigate(`/house/${house.id}`)} className="primaryButton"> مشاهده ملک</button>
                                </div>  

                            )
                        }
                             
                        )
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
};

export default SearchResults;

/* eslint-disable no-unused-vars */
import { API_GETHOUSE } from "../../services/apiServices";
import { useEffect, useState, useRef } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HomeMap from "./HomeMap";
import { BeatLoader } from "react-spinners";
import { FaChevronLeft, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import {truncateText} from '../../utils/util'
export default function Home() {
    const [houses, setHouses] = useState([]);
    const [displayedHouses, setDisplayedHouses] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const loadMoreRef = useRef(null);

    useEffect(() => {
        const fetchHouses = async () => {
            setIsLoading(true);
            try {
                const res = await API_GETHOUSE();
                if (res.status === 200) {
                    setHouses(res.data);
                    setDisplayedHouses(res.data.slice(-14)); // Start with the first 14 houses
                } else {
                    console.error("Error fetching houses");
                }
            } catch (error) {
                console.error("Error fetching houses:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHouses();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoadingMore && displayedHouses.length < houses.length) {
                    loadMoreHouses();
                }
            },
            { threshold: 0.1 } // Adjust the threshold if needed
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
                const nextIndex = prevIndex + 14; // Increment current index by 14
                // console.log("Current Index:", prevIndex, "Next Index:", nextIndex);
    
                // Get houses from the current index to the next index
                const newHouses = houses.slice(-nextIndex, -prevIndex);
                // console.log("New Houses Loaded:", newHouses);
    
                setDisplayedHouses(prevHouses => [...prevHouses, ...newHouses]);
                return nextIndex; // Update the current index to the new position
            });
            setIsLoadingMore(false);
        }, 1000); // Simulated delay for demonstration
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
    function formatNumber(number) {
        // Convert to string and format with commas
        let formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
        // Convert to Persian numerals
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return formatted.replace(/\d/g, (digit) => persianDigits[digit]);
    }
   
    // function truncateText(text) {
    //     return text.length > 10 ? `${text.slice(0, 30)}...` : text;
    // }
    
    return (
        <>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <BeatLoader />
                </div>
            ) : (
                <>
                    <HomeMap houses={houses} />
                    <Container fluid>
                        <div className="p-3 mt-2">
                            <h3>آگهی های اخیر</h3>
                        </div>
                        <Row  className="d-flex justify-content-center align-items-center gap-4">
                            {displayedHouses.map((house) => {
                                const isBookmarked = getBookmarks().includes(house.id);

                                return (
                                    <Col key={house.id} md={5} className="mb-4">
                                        <div className="d-flex align-items-center gap-3 border border-light rounded-3 p-2 bg-light home-card"
                                        style={{
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" , 
                                            }}>
                                            <div style={{ width: "60%" }} className="d-flex flex-column justify-content-center align-items-right pe-2 gap-1">
                                                {house.prioritized ? (
                                                   <div style={{color:"#ac2323" , fontWeight:"bold"}}>نردبان شده در {house.city}</div>

                                                ):(
                                                    <div style={{ fontWeight:"bold"}}>آگهی شده در {house.city}</div> 

                                                )}
                                                <div className="fw-bold">{truncateText(house.title)}</div>
                                                {/* <div>آگهی در {house.city}</div> */}
                                                <div >املاک <FaChevronLeft size={12} /> {house.category}</div>
                                                <div style={{color:"#666"}}>{formatNumber(house.price)} تومان</div>
                                                <button onClick={() => navigate(`/house/${house.id}`)} className="smsButton"> مشاهده ملک</button>
                                            </div>
                                            <div style={{ width: "40%" }} className="d-flex justify-content-center position-relative">
                                                <img
                                                    src={house.image ? house.image : '/1.png'}
                                                    style={{ width: "180px", height: "160px", maxHeight: "170px" }}
                                                    className="border border-light rounded"
                                                    alt={house.title}
                                                />
                                                {isBookmarked ? (
                                                    <FaBookmark
                                                        onClick={() => toggleBookmark(house.id)}
                                                        size={28}
                                                        style={{
                                                            position: 'absolute',
                                                            // top: '0',
                                                            left: '1px',
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
                                                            // top: '4px',
                                                            left: '1px',
                                                            color: 'white',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                            borderRadius: '50%',
                                                            padding: '4px'
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                        {isLoadingMore && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                                <BeatLoader />
                            </div>
                        )}
                        <div ref={loadMoreRef} className="load-more" style={{ height: '20px' }}></div>
                    </Container>
                </>
            )}
        </>
    );
}

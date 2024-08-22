import { API_GETHOUSE } from "../../services/apiServices";
import { useEffect, useState, useRef } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HomeMap from "./HomeMap";
import { BeatLoader } from "react-spinners";
import { FaChevronLeft, FaRegBookmark, FaBookmark } from 'react-icons/fa';

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
                    setDisplayedHouses(res.data.slice(0, 14)); // Start with the first 14 houses
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
                const nextIndex = prevIndex + 14;
                const newHouses = houses.slice(prevIndex, nextIndex);
                setDisplayedHouses(prevHouses => [...prevHouses, ...newHouses]);
                return nextIndex;
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
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

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
                        <div className="p-3">
                            <h3>آگهی های اخیر</h3>
                        </div>
                        <Row>
                            {displayedHouses.map((house) => {
                                const isBookmarked = getBookmarks().includes(house.id);

                                return (
                                    <Col key={house.id} md={6} className="mb-4">
                                        <div className="d-flex align-items-center gap-3 border border-light rounded-3 p-2 bg-light">
                                            <div style={{ width: "60%" }} className="d-flex flex-column justify-content-center align-items-right pe-2">
                                                <div className="font-weight-bold">{house.title}</div>
                                                <div>آگهی در {house.city}</div>
                                                <div>{formatNumber(house.price)} تومان</div>
                                                <div>املاک <FaChevronLeft size={12} /> {house.category}</div>
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
                                                        size={24}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '8px',
                                                            left: '8px',
                                                            color: 'gold',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                            borderRadius: '50%',
                                                            padding: '4px'
                                                        }}
                                                    />
                                                ) : (
                                                    <FaRegBookmark
                                                        onClick={() => toggleBookmark(house.id)}
                                                        size={24}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '8px',
                                                            left: '8px',
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

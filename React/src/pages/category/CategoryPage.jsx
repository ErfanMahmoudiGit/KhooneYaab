// import { useEffect, useState } from "react";
// import { API_CATEGORY } from "../../services/apiServices";
// import { BeatLoader } from "react-spinners";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { FaChevronLeft, FaRegBookmark, FaBookmark } from 'react-icons/fa';

// export default function CategoryPage(){
//     const [detail, setDetail] = useState([]);
//     const [loading, setIsLoading] = useState(false);
//     const navigate = useNavigate()
    
//     const { category } = useParams();
//     console.log("category",category);
    

//     let cat;
//     if (category === 'BuyApartment') {
//         cat = "فروش آپارتمان";
//     } else if (category === 'RentApartment') {
//         cat = "اجارهٔ آپارتمان";
//     } else if (category === 'BuyHome') {
//         cat = "فروش خانه و ویلا";
//     } else if (category === 'RentHome') {
//         cat = "اجارهٔ خانه و ویلا";
//     } else {
//         cat = "";
//     }
//     console.log(cat);
    
    
//     function formatNumber(number) {
//         return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     }
//     useEffect(() => {
//         let resp = API_CATEGORY({category: cat})
//         setIsLoading(true)
//         // let resp = API_CATEGORY({category:"فروش آپارتمان"})
//         resp.then((res) => {
//             console.log("فروش آپارتمان",resp);
            
//             if (res.status === 200) {
//                 console.log("success");        
//                 console.log(res.data);  
//                 setDetail(res.data)
//                 setIsLoading(false)

//             } else {
//                 console.log("false"); 
//                 setIsLoading(false)
       
//             }
//         })
//     }, [category])
//     return(
//         <>
      
//         {loading ? (
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <BeatLoader />
//             </div>
//         ) : (
//             <>
//              <div className="m-3">آگهی های {cat}</div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
//                 {detail.length == 0 ? (
//                     <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' , marginTop:"20px"}}>
//                           هیچ آگهی در این دسته بندی وجود ندارد
//                     </div>
//                 ):(
//                     <>
                    
//                     {detail.map((house, index) => (
//                         <div key={index} className="d-flex flex-column justify-contemt-center align-items-center" style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//                             <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{house.title}</h3>
//                             <img style={{width:"150px" , height:"150px" , borderRadius: '8px'}} src={house.image ? house.image : '/1.png'}></img>
//                             <div style={{ fontSize: '14px', color: '#666' }}>آگهی در {house.city}</div>
//                             <div style={{ fontSize: '14px', color: '#666' }}>املاک <FaChevronLeft size={12} /> {house.category}</div>


//                             <p style={{ fontSize: '14px', color: '#666' }}>{formatNumber(house.price)} تومان</p>
//                             <button onClick={() => navigate(`/house/${house.id}`)} className="smsButton"> مشاهده ملک</button>
//                         </div>
//                     ))}
//                     </>
                   
//                 )}
//             </div>
//             </>
//         )}
//           </>
//     )
// }

import { useEffect, useState, useRef } from "react";
import { API_CATEGORY } from "../../services/apiServices";
import { BeatLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft } from 'react-icons/fa';

export default function CategoryPage() {
    const [houses, setHouses] = useState([]);
    const [displayedHouses, setDisplayedHouses] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const loadMoreRef = useRef(null);
    const navigate = useNavigate();
    const { category } = useParams();

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

    useEffect(() => {
        const fetchHouses = async () => {
            setIsLoading(true);
            try {
                const res = await API_CATEGORY({ category: cat });
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
        fetchHouses();
    }, [category]);

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

    return (
        <>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <BeatLoader />
                </div>
            ) : (
                <>
                    <h5 className="m-3">آگهی های {cat}</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                        {displayedHouses.length === 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', marginTop: "20px" }}>
                                هیچ آگهی در این دسته بندی وجود ندارد
                            </div>
                        ) : (
                            displayedHouses.map((house, index) => (
                                <div key={index} className="d-flex flex-column justify-content-center align-items-center" style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                    <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{house.title}</h3>
                                    <img style={{ width: "150px", height: "150px", borderRadius: '8px' }} src={house.image ? house.image : '/1.png'} alt={house.title} />
                                    <div style={{ fontSize: '14px', color: '#666' }}>آگهی در {house.city}</div>
                                    <div style={{ fontSize: '14px', color: '#666' }}>املاک <FaChevronLeft size={12} /> {house.category}</div>
                                    <p style={{ fontSize: '14px', color: '#666' }}>{formatNumber(house.price)} تومان</p>
                                    <button onClick={() => navigate(`/house/${house.id}`)} className="smsButton"> مشاهده ملک</button>
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

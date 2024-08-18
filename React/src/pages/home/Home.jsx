// import { Card } from "antd";
// import { API_GETHOUSE , API_RECOMMENDER } from "../../services/apiServices";
// import { useEffect, useState } from "react";
// import { Col, Row, Container } from "react-bootstrap";
// import {  useNavigate } from "react-router-dom";
// import HomeMap from "./HomeMap";
// import { BeatLoader } from "react-spinners";
// import { FaChevronLeft } from 'react-icons/fa';
// import { FaRegBookmark } from "react-icons/fa";


// export default function Home() { 
//     const [houses, setHouses] = useState([])
//     const navigate = useNavigate()
//     const[loading,setIsLoading] = useState(true)

//     useEffect(() => {
//         setIsLoading(true)
//         let resp = API_GETHOUSE()
//         resp.then((res) => {
//             if (res.status === 200) {
//                 console.log("success");        
//                 console.log(res.data);  
//                 setHouses(res.data)   
//                 setIsLoading(false)
   
//             } else {
//                 console.log("false"); 
//                 setIsLoading(false)
       
//             }
//         })
//     }, [])

//     const getBookmarks = () => {
//         const bookmarks = localStorage.getItem('BOOKMARKS');
//         return bookmarks ? JSON.parse(bookmarks) : [];
//       };
    
//       // Check if the house is already bookmarked
//       const [isBookmarked, setIsBookmarked] = useState(() => {
//         const bookmarks = getBookmarks();
//         return bookmarks.includes(house.id);
//       });
    
      
//     function formatNumber(number) {
//         // Convert the number to a string and use regex to insert commas
//         return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     }
      
//     return (
//         <>

//         {loading ?         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <BeatLoader style={{display:"flex",justifyContent:"center"}}/>
//             </div>
//         : (
//             <>
//             <HomeMap houses={houses} />
//             <Container fluid>
//                 <h4>آگهی های اخیر</h4>
//                 {/* <Row>
//     {houses.slice(-15).map((house, index) => (
//         <Col key={index} md={4} className="mb-4">
//             <Card>
//                 <div className="d-flex justify-content-center">
//                     <img
//                         src={house.image}
//                         style={{ width: "180px", height: "160px", maxHeight: "170px" }}
//                         className="border border-light rounded"
//                         alt={house.title}
//                     />
//                 </div>
//                 <div  className="d-flex flex-column justify-content-center align-items-center">
//                     <div className="font-weight-bold">{house.title}</div>
//                     <div>آگهی در {house.city}</div>
//                     <div>{house.price} تومان</div>
//                     <div>املاک/{house.category}</div>
//                     <button onClick={() => navigate(`/house/${house.id}`)} className="btn btn-primary mt-2">
//                         مشاهده ملک
//                     </button>
//                 </div>
//             </Card>
//         </Col>
//     ))}
// </Row> */}
//  <Row>
//     {houses.slice(-15).map((house, index) => (
//         <Col key={index} md={6} className="mb-4">
//             <div  className="d-flex align-items-center gap-3 border border-light rounded-3 p-2 bg-light">
                
//                 <div style={{width:"60%"}}  className="d-flex flex-column justify-content-center align-items-right pe-2">
//                     <div className="font-weight-bold">{house.title}</div>
//                     <div>آگهی در {house.city}</div>
//                     <div>{formatNumber(house.price)} تومان</div>
//                     {/* <div>{`دست املاک > ${house.category}`}</div> */}
//                     <div>املاک <FaChevronLeft size={12} /> {house.category}</div>
                   
                 
//                     {/* <div>املاک/{house.category}</div> */}
//                     <button onClick={() => navigate(`/house/${house.id}`)} className="smsButton">
//                         مشاهده ملک
//                     </button>
//                     {/* <button type="button" className="btn btn-secondary rounded-pill">
//                         Beautiful Button
//                     </button> */}
//                 </div>
//                 <div style={{width:"40%"}} className="d-flex justify-content-center position-relative">

//                     <img
//                         src={house.image}
//                         style={{ width: "180px", height: "160px", maxHeight: "170px" }}
//                         className="border border-light rounded"
//                         alt={house.title}
//                     />
//                      {/* <FaRegBookmark  onClick={()=>{
//                         localStorage.setItem('BOOKMARK',house.id)
//                      }}
//                         size={24} 
//                         style={{
//                         position: 'absolute',
//                         top: '8px',   // Adjust position from the top
//                         left: '8px', // Adjust position from the right
//                         color: 'white', // Adjust icon color to be visible over the image
//                         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add background for better visibility
//                         borderRadius: '50%', // Optional: Make the icon circular
//                         padding: '4px' // Optional: Add padding for spacing
//                         }}  */}
//                         {isBookmarked ? (
//         <FaBookmark 
//         //   onClick={()=> toggleBookmark(house)} 
//           onClick={()=> {
//             const bookmarks = getBookmarks();
//         if (isBookmarked) {
//           // Remove from bookmarks
//           const updatedBookmarks = bookmarks.filter(id => id !== house.id);
//           localStorage.setItem('BOOKMARKS', JSON.stringify(updatedBookmarks));
//           setIsBookmarked(false);
//         } else {
//           // Add to bookmarks
//           const updatedBookmarks = [...bookmarks, house.id];
//           localStorage.setItem('BOOKMARKS', JSON.stringify(updatedBookmarks));
//           setIsBookmarked(true);
//         }
//           }} 
//           size={24} 
//           style={{
//             position: 'absolute',
//             top: '8px',  
//             left: '8px', 
//             color: 'gold', // Change color when bookmarked
//             backgroundColor: 'rgba(0, 0, 0, 0.5)', 
//             borderRadius: '50%', 
//             padding: '4px'
//           }} 
//         />
//       ) : (
//         <FaRegBookmark 
//         onClick={()=> {
//             const bookmarks = getBookmarks();
//         if (isBookmarked) {
//           // Remove from bookmarks
//           const updatedBookmarks = bookmarks.filter(id => id !== house.id);
//           localStorage.setItem('BOOKMARKS', JSON.stringify(updatedBookmarks));
//           setIsBookmarked(false);
//         } else {
//           // Add to bookmarks
//           const updatedBookmarks = [...bookmarks, house.id];
//           localStorage.setItem('BOOKMARKS', JSON.stringify(updatedBookmarks));
//           setIsBookmarked(true);
//         }
//         }} 
//         size={24} 
//           style={{
//             position: 'absolute',
//             top: '8px',  
//             left: '8px', 
//             color: 'white', // Default color when not bookmarked
//             backgroundColor: 'rgba(0, 0, 0, 0.5)', 
//             borderRadius: '50%', 
//             padding: '4px'
//           }} 
//         />
//       )}
                    

//                 </div>
//             </div >
//         </Col>
//     ))}
// </Row>


            
//             </Container>
//             </>
//         )}
//         </>
//     )
// }


import { Card } from "antd";
import { API_GETHOUSE, API_RECOMMENDER } from "../../services/apiServices";
import { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HomeMap from "./HomeMap";
import { BeatLoader } from "react-spinners";
import { FaChevronLeft, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { FiCameraOff } from "react-icons/fi";

export default function Home() {
    const [houses, setHouses] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        let resp = API_GETHOUSE();
        resp.then((res) => {
            if (res.status === 200) {
                console.log("success");
                console.log(res.data);
                setHouses(res.data);
                setIsLoading(false);
            } else {
                console.log("false");
                setIsLoading(false);
            }
        });
    }, []);

    // Function to get bookmarks from localStorage
    const getBookmarks = () => {
        const bookmarks = localStorage.getItem('BOOKMARKS');
        return bookmarks ? JSON.parse(bookmarks) : [];
    };

    // Toggle bookmark state for a specific house
    const toggleBookmark = (houseId) => {
        const bookmarks = getBookmarks();
        if (bookmarks.includes(houseId)) {
            // Remove from bookmarks
            const updatedBookmarks = bookmarks.filter(id => id !== houseId);
            localStorage.setItem('BOOKMARKS', JSON.stringify(updatedBookmarks));
        } else {
            // Add to bookmarks
            const updatedBookmarks = [...bookmarks, houseId];
            localStorage.setItem('BOOKMARKS', JSON.stringify(updatedBookmarks));
        }
        // Update state to force re-render
        setHouses(houses.map(house => 
            house.id === houseId ? { ...house, isBookmarked: !bookmarks.includes(houseId) } : house
        ));
    };

    // Format number with commas
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
                            {houses.slice(-14).map((house) => {
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
                                                            // color: '#a62626',
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
                    </Container>
                </>
            )}
        </>
    );
}

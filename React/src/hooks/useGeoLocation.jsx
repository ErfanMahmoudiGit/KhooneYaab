// import { useState } from "react";

// export default function useGeoLocation(){
//     const [isLoading,setIsLoading] = useState(false)
//     const [position,setPosition] = useState({})
//     const [error,setError] = useState(null)

//     function getPosition(){
//         if(!navigator.geolocation)
//             return setError("your browser does not support geolocation")

//         setIsLoading(true)
//         navigator.geolocation.getCurrentPosition(
//             (pos)=>{
//                 setPosition({
//                     lat: pos.coords.latitude,
//                     lng: pos.coords.longitude,
//                 })
//                 setIsLoading(false)
//             },
//             (error)=>{
//                 setError(error.message)
//                 setIsLoading(false)
//             }
//         )
//     }
//     return {error,position,isLoading,getPosition}

// }
import { useState } from "react";

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(null); // Initialize as null instead of an empty object
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { error, position, isLoading, getPosition };
}

import React, { useEffect, useState } from 'react'
import axios from 'axios';


const GeocodingApi = ({pincode}) => {

  const [Newpincode, setNewPincode] = useState(null)
 
 
 


  const [center, setCenter] = useState('')
  const GOOGLE_GEOCODING_API_KEY = 'AIzaSyB77tjkpscrqLhYuh3zs6om7BsZepQP8ds';
  
  const getcoordinates = async (pincode) =>{

    try{
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: pincode,
          key: GOOGLE_GEOCODING_API_KEY,
        },
      });
  
      if (response.data.results.length > 0) {
        const {lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      }
  
      return null; // No results found
    }catch(error){
      console.error('Error fetching coords', error)
      return null;

    }

  }

  useEffect(()=>{
    if(pincode){
      setNewPincode(pincode)
    
      }
      else{
        setNewPincode('411014')
      }

    const fetchcoords = async () =>{
       if(Newpincode){

      const result = await getcoordinates(Newpincode)
      
      setCenter(`${result.latitude},${result.longitude}`)
      console.log('result',result)
    }
    }
   
    fetchcoords()

  
    // Center coordinates

  },[Newpincode])

 
  
  const zoom = 12; // Zoom level
  const size = '1000x250'; // Map image size
  const mapId = 'a61cccd7cabf1a16';
  
  // const markers = [
  //   `color:0x00FF00|${center}`, // Green marker
  //   `color:0x0000FF|${center}`,   // Blue marker
  //   // Add more markers as needed
  // ];
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&key=${GOOGLE_GEOCODING_API_KEY}&map_ids=${mapId}`;

  return (
    <div className=' relative w-full -z-10'>

           <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        md:h-24 md:w-24 h-12 w-12 bg-blue-300 opacity-40 rounded-full ring-2 ring-blue-700'></div>
         {center === null ? <div>loading</div>:<img className='rounded-lg w-full' src={mapUrl} alt="Static Map" />}
     

    </div>
  
  )
}

export default GeocodingApi

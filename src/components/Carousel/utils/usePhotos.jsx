import { useEffect, useState } from "react";

const usePhotos = () => {
  const UNSPLASH_API_KEY = "b_VrG6HDn7jMdtWRjrF0ymzFjiCvG7zi_-dLk_aepBo";
  const UNSPLASH_API_URL = "https://api.unsplash.com/photos/";
  const [photos,setPhotos] = useState([]);

  const getPhotos = async() => {
    const res = await fetch(`${UNSPLASH_API_URL}?client_id=${UNSPLASH_API_KEY}`);
    const data = await res.json();
    setPhotos(data);
  }

  useEffect(() => {
    getPhotos();
  },[]);

  return (
    photos
  )
};

export default usePhotos;

/*
const app_id = "592999";
const access_key = "b_VrG6HDn7jMdtWRjrF0ymzFjiCvG7zi_-dLk_aepBo";
const secret_key = "asMCG0LEtcwsRzDCn9kJ9j_48mLBsWsgDsM0TnTky2s";
*/
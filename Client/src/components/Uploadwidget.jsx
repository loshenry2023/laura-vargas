import { useEffect, useRef, useState } from "react";

export const UploadWidget = ({ setUserData }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'doqyrz0sg',
        uploadPreset: "gcx7ffyb"
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.secure_url;
          console.log("URL de la imagen:", imageUrl);
          setUserData(prevUserData => ({ ...prevUserData, image: imageUrl }));
        } else {
          
          console.error("Error al cargar la imagen:", error);
        }
      }
    );
  }, [setUserData]);

  return (
    <span
  className="h-10 w-[130px] cursor-pointer bg-primaryPink text-black px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
  onClick={() => widgetRef.current.open()}
>
      Subir Imagen
    </span>
  );
};
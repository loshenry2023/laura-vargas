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
    <button onClick={() => widgetRef.current.open()}>
      Subir Imagen
    </button>
  );
};
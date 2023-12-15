import { useEffect, useRef, useState } from "react";
import getParamsEnv from "../functions/getParamsEnv";
const { CLOUD_NAME, UPLOAD_PRESET } = getParamsEnv();

export const UploadWidget = ({ setUserData }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.secure_url;
          console.log("URL de la imagen:", imageUrl);
          setUserData((prevUserData) => ({ ...prevUserData, image: imageUrl }));
        } else {
          console.error("Error al cargar la imagen:", error);
        }
      }
    );
  }, [setUserData]);

  return (
    <span
      className="h-10 w-[130px] cursor-pointer shadow shadow-black bg-primaryPink text-black px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600"
      onClick={() => widgetRef.current.open()}
    >
      Subir Imagen
    </span>
  );
};

import { useEffect, useRef } from "react";
import getParamsEnv from "../functions/getParamsEnv";
const { CLOUD_NAME, UPLOAD_PRESET } = getParamsEnv();

export const UploadWidgetConsent = ({ setConsent, setConsentLoaded, setConsentUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        sources: ["local"], // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: false,  //restrict upload to a single file
        clientAllowedFormats: ["pdf"], //restrict uploading to image files only
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const pofUrl = result.info.secure_url;

          setConsent("https://cdn4.iconfinder.com/data/icons/file-extensions-1/64/pdfs-512.png");
          setConsentLoaded(true)
          setConsentUrl(pofUrl)
        } else {
          //console.error("Error al cargar la imagen:", error);
        }
      }
    );
  }, [setConsent]);

  return (
    <span
      className="flex items-center cursor-pointer shadow shadow-black bg-primaryPink text-black rounded-md px-2 hover:bg-blue-600 transition duration-300 dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600"
      onClick={() => widgetRef.current.open()}
    >
      Subir Imagen
    </span>
  );
};

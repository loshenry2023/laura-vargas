import { useEffect, useRef } from "react";
import getParamsEnv from "../functions/getParamsEnv";
const { CLOUD_NAME, UPLOAD_PRESET } = getParamsEnv();

export const UploadWidgetConsent = ({ isConsentVisible, setConsent, setConsentLoaded, setConsentUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  //console.log(isConsentVisible)

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
    <button
      disabled={!isConsentVisible}
      className={` ${isConsentVisible ? "" : "bg-gray-400 hover:bg-gray-400"}  flex items-center cursor-pointer shadow shadow-black bg-primaryPink text-black rounded-md px-2 hover:bg-blue-600 transition duration-300 dark:text-darkText dark:shadow-darkText dark:bg-darkPrimary dark:hover:bg-zinc-800`}
      onClick={() => widgetRef.current.open()}
    >
      Subir Imagen
    </button>
  );
};

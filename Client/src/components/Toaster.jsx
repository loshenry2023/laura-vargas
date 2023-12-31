import React from 'react'
import { Toaster } from "react-hot-toast";

const ToasterConfig = () => {
  return (
    <div>
         <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{
            zIndex: 1000,
            marginTop: "20px",
            height: "150px",
          }}
          toastOptions={{
            className: "",
            duration: 3000,
            style: {
              background: "#ffc8c8",
              color: "#363636",
            },

            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
              style: {
                background: "#00A868",
                color: "#FFFF",
              },
            },

            error: {
              duration: 3000,
              theme: {
                primary: "pink",
                secondary: "black",
              },
              style: {
                background: "#C43433",
                color: "#fff",
              },
            },
          }}
        />
    </div>
  )
}

export default ToasterConfig
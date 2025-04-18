import React from "react";

const Loader = () => {
  return (
    <>
      <div className="loader-wrapper">
        <div className="loader" />
        <style jsx>{`
          .loader-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; /* Full screen height */
            background: white; /* Or transparent if needed */
          }

          .loader {
            border: 5px solid #f3f3f3; /* Light grey */
            border-top: 5px solid #3498db; /* Blue color for the spinner */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite; /* Make the spinner rotate */
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Loader;

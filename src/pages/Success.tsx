/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useGlobalStore from "../store/useGlobalStore";

const Success = () => {
  const { emptyCart } = useGlobalStore();

  React.useEffect(() => {
    emptyCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <svg
              className="h-16 w-16 text-green-500 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              Payment Successful
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;

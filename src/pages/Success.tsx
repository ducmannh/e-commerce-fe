/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useGlobalStore from "../store/useGlobalStore";

const Success = () => {
  const { emptyCart } = useGlobalStore();

  React.useEffect(() => {
    emptyCart();
  }, []);
  
  return (
    <div className="h-screen flex items-center justify-center">
      Payment successful
    </div>
  );
};

export default Success;

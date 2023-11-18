import React, { useCallback, useEffect } from "react";

const ReUsableModal = ({ children, handleModalOpen }) => {
  const handleOverlayClick = useCallback(() => {
    handleModalOpen();
  }, [handleModalOpen]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="mx-auto w-full fixed inset-0 z-[1002] h-screen justify-center flex items-center ">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={handleOverlayClick}
      ></div>
      <div className="z-[60] relative md:ml-0  md:mr-0 ml-3 mr-3">{children}</div>
    </div>
  );
};

export default ReUsableModal;

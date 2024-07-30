import React, { useEffect } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

const SearchPagination = ({
  currentPage,
  setCurrentPage,
  products,
  handleSearchPagination,
}) => {
  useEffect(() => {
    handleSearchPagination();
    window.scrollTo(0, 0);
  }, [currentPage]);
  return (
    <>
      <div className="pagination flex justify-center mt-10 ">
        <div className="join border-none">
          <button
            className="join-item btn text-4xl flex justify-center hover:bg-[#dc0000] border-none"
            onClick={() => {
              if (currentPage === 1) {
                return;
              }
              setCurrentPage((prevState) => prevState - 1);
            }}
          >
            <FaCircleArrowLeft className="text-[#dc0000] hover:text-[#ffcc00] " />
          </button>
          <button className="join-item btn text-2xl">Page {currentPage}</button>
          <button
            className="join-item btn text-4xl flex justify-center hover:bg-[#dc0000] border-none"
            onClick={() => {
              if (products.length < 10) {
                return;
              }

              setCurrentPage((prevState) => prevState + 1);
            }}
          >
            <FaCircleArrowRight className="text-[#dc0000] hover:text-[#ffcc00]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchPagination;

import React, { useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Pagination = () => {
  const productsLoaderData = useLoaderData();

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <>
    <div className="pagination flex justify-center my-4  ">
      <div className="join">
        <button
          className="join-item btn  text-4xl flex justify-center hover:bg-[#dc0000] border-none"
          onClick={() => {
            
            if(productsLoaderData.page === 1){
              return;
            }
            handlePageChange(productsLoaderData.page - 1)
            window.scrollTo(0, 0)
          
          }}
        >
          <FaCircleArrowLeft  className="text-[#dc0000] hover:text-[#ffcc00]"/>
        </button>
        <button className="join-item btn text-2xl">Page {productsLoaderData.page}</button>
        <button
          className="join-item btn text-4xl flex justify-center hover:bg-[#dc0000] border-none"
          onClick={() => {

            if(productsLoaderData.productsLength < 10){
              return;
            }

            handlePageChange(productsLoaderData.page + 1)
            window.scrollTo(0, 0)
          }
          }
        >
          <FaCircleArrowRight className="text-[#dc0000] hover:text-[#ffcc00]"/>
        </button>
      </div>
    </div>
    </>

  );
};

export default Pagination;

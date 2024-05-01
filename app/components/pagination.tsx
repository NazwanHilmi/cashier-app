"use client"


import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from 'react-icons/fa6';

const PaginationSection = ({
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
}: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    setCurrentPage: any;
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(i);
    }

    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (
        <>
            {totalItems > itemsPerPage ? (
                <div className='w-full flex items-center justify-end gap-3'>
                    <button className='btn btn-neutral capitalize btn-sm bg-white text-gray-800 hover:text-zinc-100' onClick={handlePrevPage}><FaAngleLeft /></button>
                    <div className="join justify-end">
                        {pages.map((page, index) => (
                            <button key={index} className={`join-item btn ${currentPage === page ? " btn-neutral" : ""}`} onClick={() => setCurrentPage(page)}>{page}</button>
                        ))}
                    </div>
                    <button className='btn btn-sm capitalize btn-neutral bg-white text-gray-800 hover:text-zinc-100' onClick={handleNextPage}><FaAngleRight /></button>
                </div>
            ) : null}
        </>
    );
}

export default PaginationSection
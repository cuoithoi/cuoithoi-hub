import React, { useEffect, useState } from 'react';
import { Panel } from './panel';

const PaginatedList = ({ data, itemsPerPage }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [showPagi, setShowPagi] = useState(0);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setShowPagi(totalPages)
    }, [])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='pagination'>
            <div className='pagination_style'>
                {currentData.map((item, index) => (
                    <Panel title={item.title} key={index}>
                        <div className='panel_colisape_description'>
                            <div className='entry'>
                                {item.description}
                            </div>
                        </div>
                    </Panel>
                ))}
            </div>
            <div className='navigation'>
                {
                    showPagi !== 1 && <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Trước
                    </button>
                }
                {
                    showPagi !== 1 && Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                disabled={currentPage === pageNumber}
                            >
                                {pageNumber}
                            </button>
                        )
                    )}
                {
                    showPagi !== 1 && <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Sau
                    </button>
                }
            </div>
        </div>
    );
};

export default PaginatedList;

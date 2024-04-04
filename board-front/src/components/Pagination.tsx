import React from 'react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const pagesToShow = 5; // 보여줄 페이지 수
    const pages: number[] = [];

     // 시작 페이지와 끝 페이지 계산
     let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
     let endPage = Math.min(totalPages, startPage + pagesToShow - 1);
 
     // 시작 페이지를 다시 계산하여 보여줄 페이지 수를 유지
     startPage = Math.max(1, endPage - pagesToShow + 1);
 
     // 페이지 번호 계산
     for (let i = startPage; i <= endPage; i++) {
         pages.push(i);
     }
 

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <nav>
                <ul className="pagination">
                    {/* First button */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => goToPage(1)} aria-label="First">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>

                    {/* Previous button */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => goToPage(currentPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">&lt;</span>
                        </button>
                    </li>

                    {/* Page numbers */}
                    {pages.map((page) => (
                        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => goToPage(page)}>
                                {page}
                            </button>
                        </li>
                    ))}

                    {/* Next button */}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => goToPage(currentPage + 1)} aria-label="Next">
                            <span aria-hidden="true">&gt;</span>
                        </button>
                    </li>

                    {/* Last button */}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => goToPage(totalPages)} aria-label="Last">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

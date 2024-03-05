import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <BootstrapPagination>
      <BootstrapPagination.First onClick={() => onPageChange(1)} />
      <BootstrapPagination.Prev onClick={goToPreviousPage} disabled={currentPage === 1} />

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => {
        // 현재 페이지(currentPage)를 중심으로 앞뒤로 2개의 페이지만 표시
        if (pageNum >= currentPage - 2 && pageNum <= currentPage + 2) {
          return (
            <BootstrapPagination.Item
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              active={pageNum === currentPage}
            >
              {pageNum}
            </BootstrapPagination.Item>
          );
        }
        return null;
      })}

      <BootstrapPagination.Next onClick={goToNextPage} disabled={currentPage === totalPages} />
      <BootstrapPagination.Last onClick={() => onPageChange(totalPages)} />
    </BootstrapPagination>
  );
};

import React, { useState } from 'react';
import { Coupon } from 'types';
import { CouponComp } from 'components/Coupon/CouponComp';
import { Pagination } from 'components/Pagination';

interface MyCouponsProps {
  coupons?: Coupon[];
}

export const MyCoupons: React.FC<MyCouponsProps> = ({ coupons }) => {
  const pageSize = 5; // 페이지당 쿠폰 수
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 따른 쿠폰 목록 계산
  const currentCoupons = coupons?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // 페이지 변경 함수
  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div>
      <div className='mt-3 text-left text-2xl font-semibold'> 내 쿠폰함 </div>

      {currentCoupons?.map((coupon, index) => (
        <div key={index} className="bg-white border rounded-lg shadow-md p-1 m-3">
          <CouponComp coupon={coupon} />
        </div>
      ))}
      {coupons && (
        <Pagination
          pageSize={pageSize}
          totalPages={Math.ceil(coupons.length / pageSize)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

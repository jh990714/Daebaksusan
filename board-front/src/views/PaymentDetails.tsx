import React, { useEffect, useRef, useState } from 'react';
import { PaymentShowList } from 'components/PaymentDetail/PaymentShowList';
import { Link, useNavigate } from 'react-router-dom';
import { sendRequestWithToken } from 'apis/sendRequestWithToken';
import { useAuthContext } from 'hook/AuthProvider';
import { MyPageMenu } from 'components/MyPage/MyPageMenu';
import { Pagination } from 'components/Pagination';
import { PaymentDetail } from 'types';
import { Loading } from 'components/Loading/Loading';

export const PaymentDetails: React.FC = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[] | null>(null);
    const [page, setPage] = useState<number>(1); // 페이지 번호
    const pageSize = 5; // 페이지 크기
    const [totalPages, setTotalPages] = useState<number>(1); // 전체 페이지 수
    const paymentShowListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchData();
    }, [page]); // 페이지 번호가 변경될 때마다 데이터를 새로 가져옵니다.

    const fetchData = async () => {
        try {
            const url = `/info/orderDetails?page=${page}&pageSize=${pageSize}`;
            const post = 'GET';
            const data = null;
            const response = await sendRequestWithToken(url, post, data, setIsLoggedIn);
            
            console.log(response.content)
            setPaymentDetails(response.content);
            setTotalPages(Math.ceil(response.totalElements / pageSize));
        } catch (error) {
            navigate('/login');
            console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        scrollPaymentShowListToTop();
    };

    const scrollPaymentShowListToTop = () => {
        if (paymentShowListRef.current) {
            paymentShowListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const updatePaymentDetails = (updatedPaymentDetails: PaymentDetail[]) => {
        setPaymentDetails(updatedPaymentDetails);
    };


    return (
        <div className="sm:w-4/5 sm:mt-5 md:ml-10" ref={paymentShowListRef}>
            <div className='mt-3 text-left text-2xl border-b font-semibold'> 주문 내역 </div>
            <div className='font-medium'>
                {paymentDetails ? (
                    <>
                        <PaymentShowList paymentDetails={paymentDetails} onPaymentDetailsChange={updatePaymentDetails}/>
                        <Pagination pageSize={pageSize} totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
};

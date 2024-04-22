import React, { useEffect, useState } from 'react';
import { PaymentShowList } from 'components/PaymentDetail/PaymentShowList';
import { Link, useNavigate } from 'react-router-dom';
import { sendRequestWithToken } from 'apis/sendRequestWithToken';
import { useAuthContext } from 'hook/AuthProvider';
import { MyPageMenu } from 'components/MyPage/MyPageMenu';
import { Pagination } from 'components/Pagination';
import { PaymentDetail } from 'types';

export const PaymentDetails: React.FC = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[] | null>(null);
    const [page, setPage] = useState<number>(1); // 페이지 번호
    const pageSize = 5; // 페이지 크기
    const [totalPages, setTotalPages] = useState<number>(1); // 전체 페이지 수

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `/info/orderDetails?page=${page}&pageSize=${pageSize}`;
                const post = 'GET';
                const data = null;
                const response = await sendRequestWithToken(url, post, data, setIsLoggedIn);

                setPaymentDetails(response.content);


                console.log(response.content)
                setTotalPages(Math.ceil(response.totalElements / pageSize));
            } catch (error) {
                navigate('/login');
                console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchData();
    }, [page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="sm:w-4/5 sm:mt-5 md:ml-10">
                {paymentDetails ? (
                    <>
                        <PaymentShowList paymentDetails={paymentDetails} />
                        <Pagination pageSize={pageSize} totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            
        </div>     
    );
};

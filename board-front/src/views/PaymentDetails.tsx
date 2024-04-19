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
        <div className="lg:mx-16 xl:mx-56 2xl:mx-80 mt-10 p-2 md:p-5 rounded-lg">
            <div className="sm:flex justify-between items-center sm:border-b sm:pb-4">
                <h1 className="hidden sm:block text-xl text-blue-600 font-semibold">마이페이지</h1>
               
            </div>
            <div className="sm:py-5">
                <div className="sm:flex sm:justify-between">
                    <div className="hidden sm:block w-1/6 border-r text-l font-semibold" >
                        <MyPageMenu />
                    </div>

                    <div className="sm:w-4/5">
                        <div className='text-left ml-10 text-2xl border-b font-semibold'> 주문 내역 </div>
                        <div className='ml-10 font-medium'>
                            {paymentDetails ? (
                                <>
                                    <PaymentShowList paymentDetails={paymentDetails} />
                                    <Pagination pageSize={pageSize} totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

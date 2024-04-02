import React, { useEffect, useState } from 'react'
import { PaymentShowList } from 'components/PaymentShowList';
import { Link, useNavigate } from 'react-router-dom';
import sendRequestWithToken from 'apis/sendRequestWithToken';
import { useAuthContext } from 'hook/AuthProvider';
import { PaymentDetail } from 'types';
import { MyPageMenu } from 'components/MyPage/MyPageMenu';


export const PaymentDetails:React.FC = () => {

    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const [ paymentDetails, setPaymentDetails ] = useState<PaymentDetail[]|null>(null)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = '/info/paymentDetails';
                const post = 'GET';
                const data = null;
                const response = await sendRequestWithToken(url, post, data, setIsLoggedIn);  
                console.log(response)
                setPaymentDetails(response)
                    
            } catch (error) {
                navigate('/login');
                console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchData();
    }, []);
    
    return (
        <div className="container mx-auto mt-10 p-5 rounded-lg">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-2xl text-blue-600 font-semibold">마이페이지</h1>
                <div>
                    <span className="text-gray-600 font-semibold">이광득 </span>
                    <span className="text-gray-600">고객님</span>
                    <a href="#" className="text-blue-600 ml-2">회원 정보 수정 {'>'}</a>
                </div>
            </div>
            <div className="py-5">
                <div className="flex">
                    <div className="w-1/6 border-r text-l font-semibold" >
                        <MyPageMenu />
                    </div>

                    <div>
                        <div className='text-left ml-10 text-2xl border-b font-semibold'> 주문 내역 </div>
                        <div className='ml-10 font-medium'>
                            {paymentDetails ? (
                                <PaymentShowList paymentDetails={paymentDetails} />
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div> 
                    </div>
                            
                </div>
            </div>
        </div>
    );
}

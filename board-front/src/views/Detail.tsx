import { DetailTabComp } from 'components/DetailTabComp';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react'


export const Detail:React.FC = () => {
    const product = useLocation().state.product;


    const [isSticky, setIsSticky] = useState(false);

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const sticky = scrollTop > 100; // 100px 이상 스크롤되었을 때 sticky 상태로 변경
        setIsSticky(sticky);
    };

    // 컴포넌트가 마운트되었을 때 스크롤 이벤트 리스너 추가
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // 컴포넌트가 언마운트되기 전에 이벤트 리스너 제거
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []); // 빈 배열로 의존성 배열을 설정하여 컴포넌트가 마운트될 때만 이벤트 리스너가 추가되도록 함



  return (
    <div className="bg-white text-gray-700">

            <main className="container mx-auto my-8 p-4">
                <div className="flex flex-wrap md:flex-nowrap items-stretch">
                    <div className="w-full md:w-1/2 p-4">
                        <img src={`../upload/${product.productImgPath}`} alt={product.productImgPath} className="w-full h-96 object-cover m-auto rounded shadow-lg " />
                    </div>
                    <div className="w-full md:w-1/2 border-t-2 border-b-2 border-blue-700">
                        <h1 className="text-2xl font-bold border-b-2 border-gray-200 p-4">{product.productName}</h1>
                        <div className="text-start border-b-2 border-gray-200 px-4 py-1">
                            <div className="grid grid-cols-5">
                                <div className="font-bold">판매가</div>
                                <div className="col-span-4 text-xl">{(product.productPrice-product.productDiscount).toLocaleString()}</div>
                            </div>
                        </div>
                        <div className="grid grid-rows-3 text-start border-b-2 border-gray-200 px-4 py-1">
                            <div className="grid grid-cols-5">
                                <div className="font-bold">원산지</div>
                                <div className="col-span-4">완도군</div>
                            </div>
                            <div className="grid grid-cols-5">
                                <div className="font-bold">배송</div>
                                <div className="col-span-4">택배</div>
                            </div>
                            <div className="grid grid-cols-5">
                                <div className="font-bold">배송 비</div>
                                <div className="col-span-4">무료</div>
                            </div>
                            
                        </div>
                        <div className="border-b-2 border-gray-200 px-4 py-2">
                            <label htmlFor="option-select" className="mb-2"><strong>[필수]</strong> 옵션 선택</label>
                            <select id="option-select" className="w-full border border-gray-300 rounded p-2">
                                <option>12-13미 옵션</option>
                            </select>
                        </div>
                        <div className="border-b-2 border-gray-200 px-4 py-1">
                            <div className="text-end">총 : {(product.productPrice-product.productDiscount).toLocaleString()} 원(1개)</div>
                        </div>
                        <div className="flex justify-center space-x-2 py-4">
                            <button className="bg-blue-700 text-white px-4 py-2 rounded">구매하기</button>
                            <button className="border border-gray-300 px-4 py-2 rounded">장바구니 담기</button>
                        </div>
                    </div>
                </div>

                <div className="my-8 w-full ">
                    <h2 className="text-2xl font-bold my-4">오늘의 추천 상품 !</h2>
                    <div className="flex overflow-x-auto gap-4">
                        <div className=''>
                            <div className="w-48 ">
                                <img src="../upload/1.jpg" alt="오징어" className="w-full h-48 object-fill rounded shadow-lg" />
                            </div>
                            <div className="text-center">오징어 1KG</div>
                            <div className="text-center">40,000 원</div>
                        </div>
                    </div>
                </div>

                <div className={"my-8 w-full"}>
                    <DetailTabComp />
                </div>
            </main>


        </div>
    );
}

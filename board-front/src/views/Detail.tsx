import React from 'react'


export const Detail:React.FC = () => {
  return (
    <div className="bg-white text-gray-700">

            <main className="container mx-auto my-8 p-4">
                <div className="flex flex-wrap md:flex-nowrap items-stretch">
                    <div className="w-full md:w-1/2 p-4">
                        <img src="../upload/1.jpg" alt="대전복" className="w-full h-96 object-cover m-auto rounded shadow-lg " />
                    </div>
                    <div className="w-full md:w-1/2 border-t-2 border-b-2 border-blue-700">
                        <h1 className="text-2xl font-bold border-b-2 border-gray-200 p-4">대전복 12-13미 1kg(마리당 77g 내외)</h1>
                        <div className="text-start border-b-2 border-gray-200 px-4 py-1">
                            <div className="grid grid-cols-5">
                                <div className="font-bold">판매가</div>
                                <div className="col-span-4 text-xl">38,000원</div>
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
                            <div className="text-end">총 : 38,000 원(1개)</div>
                        </div>
                        <div className="flex justify-center space-x-2 py-4">
                            <button className="bg-blue-700 text-white px-4 py-2 rounded">BUY NOW</button>
                            <button className="border border-gray-300 px-4 py-2 rounded">ADD CART</button>
                            <button className="border border-gray-300 px-4 py-2 rounded">WISH</button>
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

                <div className="my-8">
                    <div className="flex justify-center space-x-2 mb-4">
                        <button className="tab-active px-4 py-2 rounded">상품정보</button>
                        <button className="tab-inactive px-4 py-2 rounded">구매안내</button>
                        <button className="tab-inactive px-4 py-2 rounded">관련상품</button>
                        <button className="tab-inactive px-4 py-2 rounded">후기</button>
                        <button className="tab-inactive px-4 py-2 rounded">QnA</button>
                    </div>
                    <div className="flex justify-center border p-4 rounded">
                        <img src="../detail/1.jpg" alt="오징어" className="" />
                    </div>
                </div>
            </main>

        
        </div>
    );
}

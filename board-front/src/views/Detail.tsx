import React from 'react'


export const Detail:React.FC = () => {
  return (
    <div className="bg-white text-gray-700">

            <main className="container mx-auto my-8 p-4">
                <div className="flex flex-wrap md:flex-nowrap items-stretch">
                    <div className="w-full md:w-1/2 p-4">
                        <img src="https://source.unsplash.com/random/600x600?abalone" alt="대전복" className="rounded shadow-lg" />
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        <h1 className="text-2xl font-bold">대전복 12-13미 1kg(마리당 77g 내외)</h1>
                        <p className="text-xl my-2">38,000원</p>
                        <div className="my-4">
                            <p><strong>원산지:</strong> 완도군</p>
                            <p><strong>배송방법:</strong> 택배</p>
                            <p><strong>배송비:</strong> 무료</p>
                        </div>
                        <div className="my-4">
                            <label htmlFor="option-select"><strong>[필수]</strong> 12-13 옵션 선택</label>
                            <select id="option-select" className="border border-gray-300 rounded p-2">
                                <option>12-13미 옵션</option>
                            </select>
                        </div>
                        <div className="my-4">
                            <p>TOTAL : 0(0개)</p>
                        </div>
                        <div className="flex space-x-2 my-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">BUY NOW</button>
                            <button className="border border-gray-300 px-4 py-2 rounded">ADD CART</button>
                            <button className="border border-gray-300 px-4 py-2 rounded">WISH</button>
                        </div>
                    </div>
                </div>

                <div className="my-8">
                    <h2 className="text-2xl font-bold my-4">오늘의 추천 상품 !</h2>
                    <div className="flex overflow-x-auto gap-4">
                        <div className="min-w-max">
                            <img src="https://source.unsplash.com/random/200x200?squid" alt="오징어" className="rounded shadow-lg" />
                            <p className="text-center">오징어 1KG</p>
                            <p className="text-center">40,000 원</p>
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
                    <div className="border p-4 rounded">
                        <p>해당 내용</p>
                    </div>
                </div>
            </main>

        
        </div>
  );
}

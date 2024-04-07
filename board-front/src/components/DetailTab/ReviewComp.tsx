import React from 'react'

export default function ReviewComp() {
    return (
        <div className="p-10 grid grid-rows-7 border-t-2 border-blue-700">
            <div className='flex'>
                <div className="text-6xl">ㅇ</div>
                <div>
                    <div className="grid grid-cols-2">
                        <div className="bg-gray-100 text-xs p-1 text-blue-600 font-bold">베스트리뷰</div>
                        <div></div>
                    </div>
                    <div className="m-1 text-black text-start text-sm">v포로리v</div>
                    <div className="text-xs text-gray-400">리뷰 77 · 사진 487 · 장소 68</div>
                </div>
            </div>
            <div className="row-span-6">
                <div className="flex m-2">
                    <div className="mr-3 content-center text-xl">ㅁㅁㅁㅁㅁ</div>
                    <div className="content-center text-sm text-gray-400">2개월 전</div>
                </div>
                <img src={process.env.PUBLIC_URL + `/upload/16.jpg`} className="m-2 rounded-md" width={222}></img>
                <div className="m-2 text-start text-xs text-gray-500">싱싱 자연산 참소라 2kg 고급 포장</div>
                <div className="m-2 text-sm text-gray-600">시부모님께서 급하게 당일 연락하셔서 괜찮은 숙소좀 찾아서 예약해달라고 하시더라구요. 

일단 평점 높은곳, 가격, 조식여부 등 제일 괜찮아 보여서 예약해 드렸어요.

여행 많이 다니시는 분들이라 여기저기 숙소 많이 다니셨는데 단연 최고인것 같다고 하시더라고요^^

깨끗하고 냄새 안나는것은 물론 조식도 잘 나왔다고 엄청 칭찬하셨어요~^^

아버님께서 직접 방 안에 사진까지 찍어서 보내주셨더라고요.

그다음 날은 진도에 방 잡아달라고 하셨는데
숙소도 몇군데 없는데 방값이 비싸서 그냥 또 여기로 잡아달라하시더라고요.
2박인데 따로 따로 예약을 하게되었네요ㅎㅎ

좋은 가격에 깔끔하고 조식도 잘 나와서
별 ⭐️⭐️⭐️⭐️⭐️ 다섯개 추천합니다!!^^</div>
                <div className="bg-gray-100 mt-4">
                    <div className="p-2 text-start text-black font-bold">대박수산 답변</div>
                    <div className="p-2 text-gray-600">v포로리v 님 안녕하세요. 저희 라임호텔 목포점을 이용해주셔서 대단히 감사드립니다 친절과 청결은 저희 호텔임직원 모든 인원이 첫번째로 신경쓰는 부분이며 무조건 깨끗해야 한다는 생각으로 객실 점검 및 관리를 하고있습니다. 큰 불편함 없이 이용해 주신거 같아서 다행입니다 다음에 또 방문해주시는 일정이있으시다면 그때도 같은 만족감을 드릴수 있도록 최선을 다해 준비해두겠습니다 혹시라도 불편사항등은 언제든 프론트로 문의주시면 24시간 친절히 안내해드리고 해결해드리고있으니 지내시다 불편한점있으시면 언제든 문의주시기 바랍니다. ♣매일아침 토스트, 씨리얼, 컵라면, 아메리카노 및 기타 음료 등등 다양한조식을 제공해드리고있습니다♣ ♣전객실 4K UHD 65인치 스마트TV + 프리미엄 라텍스 7존 독립 스프링 매트리스 + 전객실 삼성에어드레서♣ ♣전객실 삼성 최신형 공기청정기 + 전객실 ULTRA 화질 넷플릭스 / 유튜브 + 아마존 프라임 플렛폼 등등..제공됩니다♣</div>
                </div>
            </div>
        </div>

    )
}

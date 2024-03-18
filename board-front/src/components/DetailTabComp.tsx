import React, { useEffect, useState } from 'react'



export const DetailTabComp:React.FC = () => {

    const [activeTab, setActiveTab] = useState<string>('상품정보');

    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 700) { // 100px 이상 스크롤됐는지 확인
            setShowButtons(true);
            } else {
            setShowButtons(false);
            }
        };

        // 스크롤 이벤트 리스너 등록
        window.addEventListener('scroll', handleScroll);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // 빈 의존성 배열을 전달하여 컴포넌트 마운트 시에만 실행되도록 함

    // showButtons 상태에 따라 클래스를 조건부로 적용
    const containerClasses = `fixed grid grid-rows-5 gap-2 bottom-[300px] left-[50px] ${showButtons ? '' : 'hidden'}`;


    // 각 탭의 내용을 반환하는 함수입니다.
    const renderContent = () => {
        switch (activeTab) {
            case '상품정보':
                return <img src="../detail/1.jpg" alt="상품정보" />;
            case '구매안내':
                return <div>구매안내 내용입니다.</div>;
            case '관련상품':
                return <div>관련상품 내용입니다.</div>;
            case '후기':
                return <div>후기 내용입니다.</div>;
            case 'QnA':
                return <div>QnA 내용입니다.</div>;
            default:
                return null;
        }
    };
    // 버튼의 스타일을 결정하는 함수입니다.
    const buttonStyle = (tabName: string) => {
        return `px-4 py-2 rounded hover:ring hover:ring-blue-700 ${activeTab === tabName ? 'bg-blue-700 text-white' : 'tab-inactive'}`;
    }
    const fixedbuttonStyle = (tabName: string) => {
        return `px-4 py-2 rounded-full hover:ring hover:ring-blue-700 ${activeTab === tabName ? 'bg-blue-700 text-white' : 'tab-inactive'}`;
    }

    return (

        <div className="my-8 static">
            <div className="flex justify-center space-x-2 mb-4">
                <button className={buttonStyle('상품정보')} onClick={() => setActiveTab('상품정보')}>상품정보</button>
                <button className={buttonStyle('구매안내')} onClick={() => setActiveTab('구매안내')}>구매안내</button>
                <button className={buttonStyle('관련상품')} onClick={() => setActiveTab('관련상품')}>관련상품</button>
                <button className={buttonStyle('후기')} onClick={() => setActiveTab('후기')}>후기</button>
                <button className={buttonStyle('QnA')} onClick={() => setActiveTab('QnA')}>QnA</button>
            </div>
            <div className={containerClasses}>
                <button className={fixedbuttonStyle('상품정보')} onClick={() => setActiveTab('상품정보')}>상품정보</button>
                <button className={fixedbuttonStyle('구매안내')} onClick={() => setActiveTab('구매안내')}>구매안내</button>
                <button className={fixedbuttonStyle('관련상품')} onClick={() => setActiveTab('관련상품')}>관련상품</button>
                <button className={fixedbuttonStyle('후기')} onClick={() => setActiveTab('후기')}>후기</button>
                <button className={fixedbuttonStyle('QnA')} onClick={() => setActiveTab('QnA')}>QnA</button>
            </div>
            <div className="flex justify-center border p-4 rounded">
                {renderContent()}
            </div>
        </div>

    );
}

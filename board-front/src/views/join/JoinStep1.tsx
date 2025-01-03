import JoinTimeLineComp from 'components/JoinTimeLineComp';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import enterpriseIcon from '../../assets/enterpriseIcon.png';
import individualIcon from '../../assets/individualIcon.png';

export const JoinStep1: React.FC = () => {
    const [memberType, setMemberType] = useState<string | null>(null);
    const [warning, setWarning] = useState<boolean>(false);
    const [showBusinessNumber, setShowBusinessNumber] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleMemberTypeChange = (type: string) => {
        setMemberType(type);
        if (warning) setWarning(false);

        // 기업 회원을 선택했을 경우 사업자 번호 입력란을 보여주고, 간편 로그인 버튼들을 숨깁니다.
        if (type === 'enterprise') {
            setShowBusinessNumber(true);
        } else {
            setShowBusinessNumber(false);
        }
    };

    const handleJoinClick = () => {
        if (!memberType) {
            setWarning(true);
            window.scrollTo({
                top: document.querySelector('.member-selection')?.getBoundingClientRect().top ?? 0 - window.innerHeight / 2,
                behavior: 'smooth',
            });
        } else {
            navigate('/joinStep2');
            console.log("회원가입 로직 처리", memberType);
        }
    };

    return (
        <div className="container mt-10 py-5 rounded-lg">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-2xl text-blue-600 font-semibold">회원가입</h1>
            </div>
            <div className="py-2">
                <div className="md:flex md:justify-between">
                    <div className="md:w-1/4 md:border-r md:text-l font-semibold">
                        <div className="space-y-6 mt-10">
                            <JoinTimeLineComp currentStep={1} />
                        </div>
                    </div>
                    <div className="text-gray-800 container mx-auto p-8 md:min-h-screen flex flex-col items-center md:w-3/4">
                        <div className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-800">대박 수산에 오신 것을 환영합니다.</div>
                        {warning && <div className="text-red-500 text-sm mb-4">회원 선택을 바랍니다.</div>}
                        <div className="md:w-3/4 member-selection flex flex-col md:flex-row justify-between gap-6 mb-6">
                            {/* 개인 회원 선택 카드 */}
                            <div
                                className={`p-6 rounded-lg shadow-md border-2 ${memberType === 'individual' ? 'border-blue-500' : 'border-gray-300'} hover:border-blue-500 transition-all duration-300 cursor-pointer w-full md:w-1/2`}
                                onClick={() => handleMemberTypeChange('individual')}
                            >
                                <img src={individualIcon} alt="개인 회원" className="mb-4 mx-auto" width="80" />
                                <div className="text-lg text-center font-semibold text-gray-800">개인 회원</div>
                                <div className="text-xs sm:text-sm text-start text-gray-600 mt-2">기업에 소속되지 않은(대한민국 사업자등록번호 미보유) 개인은 개인회원으로 가입할 수 있습니다. 개인회원은 일부 서비스 이용에 제한이 있을 수 있습니다.</div>
                            </div>
                            {/* 기업 회원 선택 카드 */}
                            <div
                                className={`p-6 rounded-lg shadow-md border-2 ${memberType === 'enterprise' ? 'border-blue-500' : 'border-gray-300'} hover:border-blue-500 transition-all duration-300 cursor-pointer w-full md:w-1/2`}
                                onClick={() => handleMemberTypeChange('enterprise')}
                            >
                                <img src={enterpriseIcon} alt="기업 회원" className="mb-4 mx-auto" width="80" />
                                <div className="text-lg text-center font-semibold text-gray-800">기업 회원</div>
                                <div className="text-xs sm:text-sm text-start text-gray-600 mt-2">기업에 소속된(대한민국 사업자등록번호 보유) 개인은 기업회원으로 가입할 수 있습니다.</div>
                            </div>
                        </div>
                        {showBusinessNumber && (
                            <div className="mb-4 w-full sm:w-1/2">
                                <input type="text" placeholder="사업자 번호 입력" className="p-2 w-full border rounded-lg" />
                            </div>
                        )}
                        <div className="text-xs mb-4">계산서가 필요하신 회원은 기업 회원으로 가입 하시길 바랍니다.</div>
                        <button className="mt-3 py-2 px-4 rounded-md bg-blue-700 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleJoinClick}>회원 가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import TermsOfServiceComp from 'components/TermsOfServiceComp';
import JoinTimeLineComp from 'components/JoinTimeLineComp';
import { useNavigate } from 'react-router-dom';

export const JoinStep2: React.FC = () => {
    const [agreement1, setAgreement1] = useState<boolean | null>(null);
    const [agreement2, setAgreement2] = useState<boolean | null>(null);
    const [agreement3, setAgreement3] = useState<boolean | null>(null);
    const navigate = useNavigate();

    const handleTermsSubmit = () => {
        if (agreement1 !== null && agreement2 !== null && agreement3 !== null) {

            navigate('/joinStep3');
        } else {
            alert('약관에 동의하거나 동의하지 않음을 선택해주세요.');
        }
    };

    return (
        <div className="container py-5 rounded-lg">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-2xl text-blue-600 font-semibold">회원가입</h1>
            </div>
            <div className="py-2">
                <div className="flex flex-col md:flex-row"> {/* 세로 정렬 후 가로 정렬 */}
                    <div className="md:w-1/4 md:pr-4 md:mb-0 md:border-r md:text-l font-semibold"> {/* 적절한 패딩 추가 */}
                        <div className="md:flex md:justify-center">
                            <JoinTimeLineComp currentStep={1} />
                        </div>
                    </div>
                    <div className="flex-grow bg-white text-gray-800 container">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col w-full space-y-4">
                                <TermsOfServiceComp
                                    agreement={agreement1}
                                    onSubmit={setAgreement1}
                                    content="첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다..."
                                />
                                <TermsOfServiceComp
                                    agreement={agreement2}
                                    onSubmit={setAgreement2}
                                    content="두 번째 약관 내용입니다..."
                                />
                                <TermsOfServiceComp
                                    agreement={agreement3}
                                    onSubmit={setAgreement3}
                                    content="세 번째 약관 내용입니다..."
                                />
                            </div>

                            <button
                                onClick={handleTermsSubmit}
                                type="button"
                                className="mt-3 py-2 px-4 rounded-md bg-blue-700 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                제출
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

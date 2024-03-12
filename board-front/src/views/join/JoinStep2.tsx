import React, { useState } from 'react';
import TermsOfServiceComp from 'components/TermsOfServiceComp';
import JoinTimeLine from 'components/JoinTimeLineComp';

export const JoinStep2: React.FC = () => {
    const [agreement, setAgreement] = useState<boolean | null>(null);

    const handleTermsSubmit = () => {
        if (agreement !== null) {
          console.log(agreement ? '동의함' : '동의하지 않음');
        } else {
          alert('약관에 동의하거나 동의하지 않음을 선택해주세요.');
        }
    };

    return (
        <div className="container mx-auto mt-10 p-5 rounded-lg">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-2xl text-blue-600 font-semibold">회원가입</h1>
            </div>
            <div className="py-2">
                <div className="flex justify-between">
                    <div className="w-1/5 border-r text-l font-semibold relative">
                        <div className="space-y-6 mt-10">
                            <div className="">
                                <JoinTimeLine currentStep={2} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <TermsOfServiceComp onSubmit={setAgreement} content="첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다..." />
                        <TermsOfServiceComp onSubmit={setAgreement} content="두 번째 약관 내용입니다..." />
                        <TermsOfServiceComp onSubmit={setAgreement} content="세 번째 약관 내용입니다..." />

                      <button onClick={handleTermsSubmit} type="button" className="mt-3 py-2 px-4 rounded-md bg-blue-700 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">제출</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import TermsOfServiceComp from 'components/TermsOfServiceComp';
import JoinTimeLine from 'components/JoinTimeLineComp';

export const JoinStep2: React.FC = () => {
    const [agreement1, setAgreement1] = useState<boolean | null>(null);
    const [agreement2, setAgreement2] = useState<boolean | null>(null);
    const [agreement3, setAgreement3] = useState<boolean | null>(null);

    const handleTermsSubmit = () => {
        if (agreement1 !== null && agreement2 !== null && agreement3 !== null) {

          window.location.href = "/joinStep3";
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
                        <TermsOfServiceComp agreement={agreement1} onSubmit={setAgreement1} content="첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다...첫 번째 약관 내용입니다..." />
                        <TermsOfServiceComp agreement={agreement2} onSubmit={setAgreement2} content="두 번째 약관 내용입니다..." />
                        <TermsOfServiceComp agreement={agreement3} onSubmit={setAgreement3} content="세 번째 약관 내용입니다..." />

                      <button onClick={handleTermsSubmit} type="button" className="mt-3 py-2 px-4 rounded-md bg-blue-700 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">제출</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

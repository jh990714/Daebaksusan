import axios from 'axios';
import { AddressFinderButton } from 'components/Button/AddressFinderButton';
import JoinTimeLineComp from 'components/JoinTimeLineComp';
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddressData, AddressObj } from 'types';
import { MemberForm } from './MemberForm';

export const JoinStep3: React.FC = () => {
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
                    <div className="md:container">
                        <div className="bg-white sm:p-6">
                            <MemberForm />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

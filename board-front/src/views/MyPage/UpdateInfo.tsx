import React, { useState } from 'react';
import Member from 'types/interface/member.interface';
import { MemberForm } from 'views/join/MemberForm';

import { PasswordConfirmation } from './PasswordConfirmation';

interface UpdateInfoProps {
    userInfo?: Member;
}

export const UpdateInfo: React.FC<UpdateInfoProps> = ({ userInfo }) => {
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState<boolean>(false);

    const handlePasswordConfirm = (isConfirmed: boolean) => {
        setIsPasswordConfirmed(isConfirmed);
    };

    return (
        <>
            {!isPasswordConfirmed ? (
                <PasswordConfirmation onConfirm={handlePasswordConfirm} />
            ) : (
                <MemberForm userInfo={userInfo} />
            )}
        </>
    );
};

import React from 'react'
import Member from 'types/interface/member.interface';
import { JoinStep3 } from './join/JoinStep3';
import { MemberForm } from './join/MemberForm';

interface UpdateInfoProps {
    userInfo?: Member;
}
export const UpdateInfo:React.FC<UpdateInfoProps> = ({userInfo}) => {
  return (
    <MemberForm userInfo={userInfo}/>
  )
}

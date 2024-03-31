import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function OAuth() {

    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{

        if (!token) return;
        
        localStorage.setItem('accessToken', token)
        navigate('/');
    }, [token]);

  return (
    <></>
  )
}

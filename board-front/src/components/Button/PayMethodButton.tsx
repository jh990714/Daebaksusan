import React from 'react';

interface PayMethodButtonProps {
    label: string;
    imageUrl: string;
    onClick: () => void;
    selected: boolean; // 선택된 상태를 나타내는 prop 추가
}

export const PayMethodButton: React.FC<PayMethodButtonProps> = ({ label, imageUrl, onClick, selected }) => {
    return (
        <button
            className={`flex flex-col items-center justify-center rounded-lg border-2
                ${selected ? 'border-blue-600' : 'border-gray-300'} 
                p-2 transition duration-300 ease-in-out hover:shadow-md`}
            onClick={onClick}
        >
            <img
                src={imageUrl}
                alt={`${label} icon`}
                className="w-28 h-20 md:w-32 md:h-28 object-contain rounded-lg"
            />
            <div
                className={`mt-2 text-sm md:text-base font-bold ${
                    selected ? 'text-blue-600' : 'text-black'
                }`}
            >
                {label}
            </div>
        </button>
    );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface IconProps {
    defaultIcon: string;
    hoverIcon: string;
    title: string;
    link: string;
    size?: number;
    badgeCount?: number; // 배지 숫자 추가
}

const IconComp: React.FC<IconProps> = ({ defaultIcon, hoverIcon, title, link, size = 45, badgeCount = -1 }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);

    return (
        <Link
            to={link}
            className="flex flex-col items-center no-underline"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {/* 아이콘과 배지 */}
            <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
                {/* 아이콘 */}
                <img
                    src={isHovered ? hoverIcon : defaultIcon}
                    alt={title}
                    style={{ width: size, height: size }}
                />

                {/* 배지 */}
                {badgeCount >= 0 && (
                    <span
                        className="absolute top-2 right-1 flex items-center justify-center bg-red-500 text-white text-xs rounded-full"
                        style={{
                            width: '16px',
                            height: '16px',
                            transform: 'translate(50%, -50%)',
                        }}
                    >
                        {badgeCount}
                    </span>
                )}
            </div>

            {/* 텍스트 */}
            <span className={`mt-2 text-center text-xs 2xl:text-lg ${isHovered ? 'text-blue-700' : 'text-black'}`}>
                {title}
            </span>
        </Link>
    );
};

export default IconComp;

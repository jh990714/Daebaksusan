import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AdData } from "types";

type AdModalProps = {
    visible: boolean; // 모달 표시 여부
    onClose: (isDayClose?: boolean) => void; // 닫기 핸들러
    closable?: boolean; // 닫기 버튼 표시 여부
    data: AdData;
};

const AdModal: React.FC<AdModalProps> = ({ visible, onClose, closable = true, data }) => {
    const STORAGE_KEY = "VisitCookie_";

    const handleDayClose = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // 내일로 설정
        localStorage.setItem(STORAGE_KEY + `${data.id}`, tomorrow.toISOString()); // ISO 형식으로 저장
        onClose();
    };
    
    if (!visible) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full sm:max-w-sm bg-white rounded-lg shadow-lg">
                {/* 광고 이미지 */}
                <Link to={data.rinkUrl}>
                    <img
                        src={data.imageUrl} // 이미지 경로를 수정하세요
                        alt="광고 이미지"
                        className="w-full h-auto rounded-t-lg"
                    />
                </Link>

                {closable && (
                  <div className="absolute sm:relative top-0 left-0 right-0 sm:bottom-0 flex justify-between sm:p-4 bg-transparent sm:bg-gray-800 text-black rounded-t-lg sm:rounded-b-lg sm:rounded-none sm:items-center sm:gap-2">
                     <button
                            onClick={handleDayClose}
                            className="px-4 py-2 text-sm bg-transparent sm:bg-blue-600 rounded hover:bg-blue-700"
                        >
                            오늘 하루 안보기
                        </button>
                        <button
                            onClick={() => onClose()}
                            className="px-4 py-2 text-sm bg-transparent sm:bg-gray-600 rounded hover:bg-gray-700"
                        >
                            닫기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(AdModal);

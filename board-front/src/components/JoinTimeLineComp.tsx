import React, { useEffect } from 'react';
import './JoinTimeLineComp.css'; // 스타일을 위한 CSS 파일

interface JoinTimeLineProps {
  currentStep: number;
}

const JoinTimeLineComp: React.FC<JoinTimeLineProps> = ({ currentStep }) => {
    // 스텝과 설명을 포함하는 객체 배열
    const steps = [
      { name: 'STEP.01', description: '본인 확인' },
      { name: 'STEP.02', description: '약관 동의' },
      { name: 'STEP.03', description: '정보 입력' },
      { name: 'STEP.04', description: '가입 완료' },
    ];

    const handleScroll = () => {
        const footer = document.querySelector('footer'); // 푸터 요소 선택
        if (!footer) return;
    
        const footerOffsetTop = footer.offsetTop;
        const timeline = document.querySelector('.timeline-container') as HTMLElement;
        if (!timeline) return;
    
        const scrollPosition = window.pageYOffset + window.innerHeight; // 현재 스크롤 위치 계산
        if (scrollPosition >= footerOffsetTop) {
          // 스크롤 위치가 푸터를 침범할 경우
          timeline.style.position = 'absolute';
          timeline.style.bottom = '20px'; // 여기서 '100px'는 예제 값으로, 실제 환경에 맞게 조정해야 합니다.
        } else {
          // 그 외의 경우 원래대로 고정
          timeline.style.position = 'fixed';
          timeline.style.bottom = '20px'; // 초기 고정 위치로 복귀
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);
  
    return (
      <div className="timeline-container">
        {steps.map((step, index) => (
          <div key={index} className={`timeline-item ${index < currentStep ? 'completed' : ''}`}>
            <div className="grid grid-rows-2">
              <div className="step">{step.name} {/* 스텝 이름 */}</div>
              <div className="description">{step.description}</div> {/* 스텝 설명 */}
            </div>
            <div className="circle"></div>
          </div>
        ))}
      </div>
    );
};

export default JoinTimeLineComp;
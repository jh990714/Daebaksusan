import React, { useEffect, useState } from 'react';
import './JoinTimeLineComp.css'; // 스타일을 위한 CSS 파일

interface JoinTimeLineProps {
  currentStep: number;
}

const JoinTimeLineComp: React.FC<JoinTimeLineProps> = ({ currentStep }) => {
  const steps = [
    { name: 'STEP.01', description: '본인 확인' },
    { name: 'STEP.02', description: '약관 동의' },
    { name: 'STEP.03', description: '정보 입력' },
    { name: 'STEP.04', description: '가입 완료' },
  ];

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 모바일 환경인지 확인
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 페이지가 처음 로드될 때 한 번 실행

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScroll = () => {
    if (isMobile) {
      const timeline = document.querySelector('.timeline-container') as HTMLElement;
      if (timeline) {
        timeline.style.position = 'relative';
        timeline.style.bottom = '0px';
      }
      return;
    }

    const footer = document.querySelector('footer'); // 푸터 요소 선택
    if (!footer) return;

    const footerOffsetTop = footer.offsetTop;
    const timeline = document.querySelector('.timeline-container') as HTMLElement;
    if (!timeline) return;

    const scrollPosition = window.pageYOffset + window.innerHeight; // 현재 스크롤 위치 계산
    if (scrollPosition >= footerOffsetTop) {
      // 스크롤 위치가 푸터를 침범할 경우
      timeline.style.position = 'absolute';
      timeline.style.bottom = '20px';
    } else {
      // 그 외의 경우 원래대로 고정
      timeline.style.position = 'fixed';
      timeline.style.bottom = '20px';
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 이벤트 리스너를 항상 정리
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]); // 모바일 여부에 따라 리스너 관리

  return (
    <div className={`timeline-container`}>
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

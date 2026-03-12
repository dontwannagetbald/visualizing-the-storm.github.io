import { useEffect, useState } from 'react';
import '../../components/PinkGirl/PinkGirl.css';

import pinkGirlImg from '../../assets/pinkgirl.png';
import sadpinkGirlImg from '../../assets/sadpinkgirl.png';
import arrowImg from '../../assets/arrow.png';
import word3 from '../../assets/word3.png';
import crowdVideo from '../../assets/part2_crowds.webm';
import timeline from '../../assets/timeline.webp';
import danmu from '../../assets/danmu.webp';
import danmuWhole from '../../assets/danmuwhole.webp';

export default function PinkGirlStandalone({ currentPage = 0 }) {
  const cards = [
    {
      title: 'What is 信息失真？',
      content:
        '信息失真是指信息在传播过程中，由于剪辑、删减、转述以及个人立场和情绪的介入，使原本完整、具体的事实逐渐偏离原始语境，最终被公众以片段化、简化甚至错误的方式理解。',
    },
    {
      title: '网络暴力和信息失真的关系是？',
      content:
        '而在这种背景下，公共讨论逐渐偏离事实本身，从对事件的理解，转变为对立场、情绪和身份的站队行为。会演变成网络暴力，也会导致旁观者的身份转化为欺凌者。',
    },
  ];

  // 独立调试页直接显示 pinkgirl 段
  const [visible] = useState(true);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [pinkGirlOffset, setPinkGirlOffset] = useState(0);
  const [timelineOffset, setTimelineOffset] = useState(0);

  // 场景由 timelineOffset 直接推导，能前后复原
  const isDanmuOnlyStage = timelineOffset <= -500;
  const isCrowdStage = timelineOffset <= -650;

  // 卡片滚动：进入第二张后继续下滚，触发 timeline 阶段
  useEffect(() => {
    if (!visible) return;

    const handleWheel = (e) => {
      if (timelineVisible) return; // timeline 激活后交给 timeline 逻辑

      setOffsetY((prev) => {
        let next = prev - e.deltaY * 0.7;

        next = Math.min(next, 0);
        next = Math.max(next, -window.innerHeight);

        if (next <= -window.innerHeight && step < cards.length - 1) {
          setStep((s) => s + 1);
          return 0;
        }

        if (next >= 0 && step > 0 && e.deltaY < 0) {
          setStep((s) => s - 1);
          return -window.innerHeight;
        }

        return next;
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [visible, step, timelineVisible]);

  // 第二张卡片上移到位后，girl 上移并开启 timeline
  useEffect(() => {
    if (step === cards.length - 1 && offsetY <= -window.innerHeight + 200) {
      setPinkGirlOffset(-150);
    } else {
      setPinkGirlOffset(0);
      setTimelineOffset(0);
    }
  }, [step, offsetY]);

  useEffect(() => {
    if (pinkGirlOffset !== 0) {
      const timer = setTimeout(() => setTimelineVisible(true), 400);
      return () => clearTimeout(timer);
    }
    setTimelineVisible(false);
  }, [pinkGirlOffset]);

  // timeline 横向滚动
  useEffect(() => {
    if (!timelineVisible) return;

    const handleWheel = (e) => {
      e.preventDefault();

      setTimelineOffset((prev) => {
        const move = Math.abs(e.deltaY) * 0.5;
        let next = prev;

        // 保持你确认过的映射：下滚 -> timeline 向右；上滚 -> timeline 向左
        if (e.deltaY > 0) next = prev - move;
        else if (e.deltaY < 0) next = prev + move;

        return Math.max(-700, Math.min(0, next));
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [timelineVisible]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000814', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 12, left: 16, color: '#9ecbff', fontSize: 14, zIndex: 999999 }}>
        PinkGirl 全段调试（从常态→sadgirl→结束，可反向复原） | page:{currentPage.toFixed(2)} | step:{step} offset:{Math.round(offsetY)} timeline:{Math.round(timelineOffset)} | stage:{isCrowdStage ? 'crowd' : isDanmuOnlyStage ? 'danmu-only' : 'timeline'}
      </div>

      <div className="pinkgirl-layer" style={{ height: '100%' }}>
        {!isDanmuOnlyStage && !isCrowdStage && (
        <div className="pinkgirl-tv" style={{ width: '92%', height: '90%' }}>
          <div className="pinkgirl-content">
            <img
              className="pinkgirl-arrow"
              src={arrowImg}
              alt=""
              style={{ display: (isDanmuOnlyStage || isCrowdStage || pinkGirlOffset !== 0) ? 'none' : 'block' }}
            />
            <img
              className="pinkgirl"
              src={isDanmuOnlyStage || isCrowdStage ? sadpinkGirlImg : pinkGirlImg}
              alt=""
              style={{ transform: `translateY(${pinkGirlOffset}px)`, transition: 'transform 0.6s ease' }}
            />
          </div>
        </div>
        )}

        {!isDanmuOnlyStage && !isCrowdStage && cards.map((card, idx) => {
          const relativeOffset = (idx - step) * window.innerHeight + offsetY;

          return (
            <div
              key={idx}
              className="pinkgirl-card"
              style={{
                pointerEvents: 'none',
                textAlign: 'center',
                padding: '2% 4%',
                transform: `translate(-50%, calc(-50% + ${relativeOffset}px))`,
                opacity: Math.abs(idx - step) <= 1 ? 1 : 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '35px',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                backgroundColor: '-moz-initial',
              }}
            >
              <span style={{ display: 'inline-block', maxWidth: '60%', backgroundColor: '#003BA5', padding: '1%', textAlign: 'center' }}>
                {card.title}
              </span>
              <span>{card.content}</span>
            </div>
          );
        })}

        {!isDanmuOnlyStage && !isCrowdStage && timelineVisible && (
          <>
            <div style={{ position: 'absolute', top: '28%', left: '58%', transform: 'translate(-50%, -50%)', width: '15%', zIndex: 10 }}>
              <img src={word3} style={{ width: '100%', display: 'block' }} />
              <div className="text" style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', fontSize: '1.1rem', transform: 'translate(-36%, -50%)', textAlign: 'left', pointerEvents: 'none' }}>
                这，是一个真实的故事……
              </div>
            </div>

            <div style={{ position: 'absolute', top: '45%', left: '12.7%', width: '73.5%', height: '46%', overflow: 'hidden', pointerEvents: 'none', zIndex: 100000 }}>
              <img
                src={timeline}
                style={{
                  position: 'absolute',
                  top: '45%',
                  left: 0,
                  width: '102rem',
                  transform: `translate(${timelineOffset}px, -50%)`,
                  pointerEvents: 'none',
                  zIndex: 10,
                  opacity: 1,
                }}
              />
            </div>
          </>
        )}

        {isDanmuOnlyStage && !isCrowdStage && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 30,
              backgroundImage: `url(${danmuWhole})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}

        {isCrowdStage && (
          <div style={{ position: 'absolute', top: '65.5%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', zIndex: 20 }}>
            <video src={crowdVideo} autoPlay muted loop style={{ width: '100%', display: 'block', marginTop: '1rem' }} />
            <img src={danmu} style={{ position: 'absolute', top: '5%', right: '-23%', width: '102rem', opacity: 1, transition: 'opacity 0.3s ease-in-out' }} />
          </div>
        )}
      </div>
    </div>
  );
}

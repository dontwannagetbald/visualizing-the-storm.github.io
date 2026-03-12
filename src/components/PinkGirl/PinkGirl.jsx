import './PinkGirl.css';
import tvImg from '../../../src/assets/tv.webp';
import pinkGirlImg from '../../../src/assets/pinkgirl.png';
import sadpinkGirlImg from '../../../src/assets/sadpinkgirl.png';

import arrowImg from '../../../src/assets/arrow.png';
import { useEffect, useState } from "react";
import word3 from '../../../src/assets/word3.png';
import crowdImg from '../../../src/assets/crowd.png';
import crowdVideo from '../../../src/assets/part2_crowds.webm'
import timeline from '../../../src/assets/timeline.png';
import danmu from '../../../src/assets/danmu.png';
import arrowUpward from '../../../src/assets/arrow_upward.png';

export default function PinkGirl({ page }) {

  const [visible, setVisible] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [timeStage, setTimeStage] = useState(false);
  const [isCrowdStage, setIsCrowdStage] = useState(false);
  const [pinkGirlOffset, setPinkGirlOffset] = useState(0);
  const [timelineOffset, setTimelineOffset] = useState(0);
  const tvOpacity = page
  ? Math.max(0.5, 1 - Math.max(0, page - 9) * 0.5)
  : 1;

  const finalOpacity = page
  ? Math.max(0, 1 - Math.max(0, page - 9.4) * 0.5)
  : 1;

  useEffect(() => {
    if (!page) return;
    if (page >= 6 && page < 10) {
      // setVisible(true);
      setTimeStage(true);
      setPinkGirlOffset(-100);
      console.log("Page 6-8: PinkGirl should appear with offset -50", setTimeStage);
      setIsCrowdStage(false);
      if(page >= 6.6&& page < 8.5) {
      const timelineoffset=-((page - 6.6) / 2) * 700; // page 6-8 对应 timeline 从 0 到 -500
      setTimelineOffset(timelineoffset);}
      // setStep(0);
    } 
    else if (page >= 10 && page < 13) {
      setIsCrowdStage(true);
      setPinkGirlOffset(0);
      setTimeStage(false);
    } 
    else  {
      setTimeStage(false);
      setIsCrowdStage(false);
      setPinkGirlOffset(0);
      // setStep(1);
    }
  }, [page]);

  // useEffect(() => {
  //   if (pinkGirlOffset !== 0) {
  //     const timer = setTimeout(() => setTimelineVisible(true), 500);
  //     return () => clearTimeout(timer);
  //   } else {
  //     setTimelineVisible(false);
  //   }
  // }, [pinkGirlOffset]);

  // timeline 横向滚动控制
  useEffect(() => {
    if (!timelineVisible) {
      setTimelineOffset(0);
      return;
    }

    const handleWheel = (e) => {
      e.preventDefault();

      setTimelineOffset((prev) => {
        const move = Math.abs(e.deltaY) * 0.5;
        let next = prev;

        if (e.deltaY > 0) {
          // 页面向下滚动 -> timeline 向右
          next = prev - move;
        } else if (e.deltaY < 0) {
          // 页面向上滚动 -> timeline 向左
          next = prev + move;
        }

        // 左右边界
        next = Math.min(next, 0);
        next = Math.max(next, -500);
        return next;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [timelineVisible]);


  return (
    
    <div className="pinkgirl-layer">
      <div className="pinkgirl-tv"
      
          >
        <img
    src={tvImg}
    className="tv-bg"
    style={{
      opacity: Math.min(tvOpacity, finalOpacity)  ,
      transition: "opacity 0.6s ease"
    }}
  />
        <div className="pinkgirl-content">
          <img
            className="pinkgirl-arrow"
            src={arrowImg}
            alt=""
            style={{
              display: isCrowdStage || timeStage ? "none" : "block",
            }}
          />
          
          <img
            className="pinkgirl"
            src={isCrowdStage ? sadpinkGirlImg : pinkGirlImg}
            alt=""
            style={{
              transform: `translateY(${pinkGirlOffset}px)`,
              transition: "transform 2s ease-in-out",
              opacity: finalOpacity,
            }}
          />
        </div>
      </div>

      {!isCrowdStage && (
        <>
          <div
            style={{
              position: "absolute",
              top: "28%",
              left: "59%",
              transform: "translate(-50%, -50%)",
              width: "15%",
              zIndex: 10,
              backgroundColor: "rgba(255,255,255,0.8)",
              opacity: pinkGirlOffset !== 0 ? 1 : 0,
              animation:
                pinkGirlOffset !== 0
                  ? "fadeIn 5s forwards, blinking 1.5s 5"
                  : "none",
              animationDelay: pinkGirlOffset !== 0 ? "0s,5s" : "0s",
            }}
          >
            <img src={word3} style={{ width: "100%", display: "block" }} />
            <div
              className="text"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100%",
                fontSize: "1.1rem",
                transform: "translate(-36%, -50%)",
                textAlign: "left",
                pointerEvents: "none",
              }}
            >
              This is a real story…
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "9.6%",
              width: "79.5%",
              height: "46%",
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 100000,
            }}
          >
            <img
              src={timeline}
              style={{
                position: "absolute",
                top: "55%",
                left: 0,
                width: "98rem",
                transform: `translate(${timelineOffset}px, -50%)`,
                pointerEvents: "none",
                zIndex: 1000,
                opacity: pinkGirlOffset !== 0 ? 1 : 0,
                animation: pinkGirlOffset !== 0 ? "fadeIn 5s forwards" : "none",
              }}
            />
          </div>
        </>
      )}

      {isCrowdStage && (
        <div
          style={{
            position: "absolute",
            top: "65.5%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "78%",
            zIndex: 20,
          }}
        >
          <video
            src={crowdVideo}
            autoPlay
            muted
            loop
            style={{ width: "100%", display: "block", marginTop: "1rem" ,opacity:finalOpacity}}
          />
          <img
            src={danmu}
            style={{
              position: "absolute",
              top: "5%",
              // right: "-23%",
              width: "70rem",
              opacity: 1,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
          <img
            className="pinkgirl-arrow-upward"
            src={arrowUpward}
            style={{
              position: "absolute",
              top: "67%",
              width: "5rem",
              right: "3%",
              opacity: finalOpacity,
              transition: "opacity 0.3s ease-in-out",
            }}
            alt=""
          />
        </div>
      )}
    </div>
  );
}

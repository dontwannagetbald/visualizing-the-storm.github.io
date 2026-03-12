import TextType from '../TextType/TextType';
import './Scene1.css';
import DecryptedText from '../DecryptedText/DecryptedText';
import { useState, useEffect } from "react";

function Scene1() {
  const [showDecrypted, setShowDecrypted] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    // 延迟后开始 YOU_Killer 动画
    const typingTimer = setTimeout(() => setStartTyping(true), 1500);
    // 延迟后显示 DecryptedText
    const decryptTimer = setTimeout(() => setShowDecrypted(true), 6000); 
    return () => {
      clearTimeout(typingTimer);
      clearTimeout(decryptTimer);
    };
  }, []);

  return (
    <section className="scene scene1">
      <video
        className="bg back"
        src="../../../src/assets/cover.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

    <div className="content" style={{ position: "relative", textAlign: "center",marginTop: "-6rem" }}>
      {/* 光晕 PNG，绝对定位，不影响文字布局 */}
      {/* <img 
        src="../../../src/assets/Spotlight.png" 
        style={{
          position: "absolute",
          top: "50%",        // 光晕垂直居中
          left: "50%",       // 光晕水平居中
          transform: "translate(-50%, -50%)",
          width: "100rem",
          height: "100rem",
          zIndex: -1,
          pointerEvents: "none",
        }}
        alt="glow"
      /> */}

      {/* TextType */}
      {startTyping && (
        <TextType 
          text={["YOU_Killer"]}
          typingSpeed={175}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="▌ "
          loop={false}
          startOnVisible={true}
          className="typed-text"
          onSentenceComplete={() => {
            console.log("TextType 打字完成触发了！");
            setShowDecrypted(true);
          }}
        />
      )}

      {/* 占位容器，固定高度保证 TextType 不移位 */}
      <div style={{ height: "0rem", position: "relative", marginTop: "0.5rem" }}>
        {showDecrypted && (
          <DecryptedText
            text="YOU_Killer?"
            animateOn="view"
            speed={175}
            revealDirection="center"
            startOnVisible={true}
            className="typed-text"
            encryptedClassName="typed-text"
          />
        )}
      </div>
    </div>
    </section>
  );
}


export default Scene1;

import sad from '../../assets/scene2/sad.png';
import sad_active from '../../assets/scene2/sad_active.png';
import neural from '../../assets/scene2/neural.png';
import neural_active from '../../assets/scene2/neural_active.png';
import smile from '../../assets/scene2/smile.png';
import smile_active from '../../assets/scene2/smile_active.png';
import emotionPopup from '../../assets/gameEmotion.png';

export default function EmotionPopup({
  sentiments = { negative: 90, neutral: 0, positive: 0 }
}) {

  const emotionConfig = [
    {
      key: "negative",
      icon: sad,
      activeIcon: sad_active
    },
    {
      key: "neutral",
      icon: neural,
      activeIcon: neural_active
    },
    {
      key: "positive",
      icon: smile,
      activeIcon: smile_active
    }
  ];

  const maxType = Object.keys(sentiments).reduce(
    (a, b) => (sentiments[a] > sentiments[b] ? a : b),
    "negative"
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '82%',   // 在 input 上方
        left: '1.5%',
        width: '52%',
        zIndex: 10
    }}

    >
      {/* 背景框 */}
      <img
        src={emotionPopup}
        alt="emotion popup"
        style={{
          width: '100%',
          display: 'block'
        }}
      />

      {/* 图标区域 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-65%, -50%)',
          display: 'flex',
          gap: '2rem',
          alignItems: 'center'
        }}
      >
        {emotionConfig.map((emotion) => {

          const isActive = maxType === emotion.key;

          return (
            <div
              key={emotion.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <img
                src={isActive ? emotion.activeIcon : emotion.icon}
                style={{ width: 32 }}
              />
            <div
            style={{
                width: 32,
                color: isActive ? "#D4F3FF" : "#0C3B4D",
                // only cancel glow/stroke when NOT active
                ...(isActive ? {} : { textShadow: 'none', WebkitTextStroke: '0' }),
            }}
            >
            {sentiments[emotion.key] ?? 0}%
            </div>            
            </div>
          );
        })}
      </div>

    </div>
  );
}
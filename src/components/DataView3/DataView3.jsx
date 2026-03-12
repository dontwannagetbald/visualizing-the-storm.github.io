// DataView1.jsx
import styles from './DataView3.module.css';
import React, { useState } from 'react';
import tab1 from '../../../src/assets/Events/Buttons/Tab1.png';
import icon1 from '../../../src/assets/Events/Buttons/Group 173.png';
import icon2 from '../../../src/assets/Events/Buttons/Group 174.png';
import icon3 from '../../../src/assets/Events/Buttons/Group 175.png';
import icon4 from '../../../src/assets/Events/Buttons/Group 176.png';
import icon5 from '../../../src/assets/Events/Buttons/Group 177.png';
import overall from '../../../src/assets/Events/overall.png'
const categories = [
  { name: '直接施暴', image: '../../../src/assets/Events/Frame 1171280048.png', icon: icon1 },
  { name: '间接施暴', image: '../../../src/assets/Events/Frame 1171280049.png', icon: icon2 },
  { name: '拱火挑事', image: '../../../src/assets/Events/Frame 1171280050.png', icon: icon3 },
  { name: '安慰支持', image: '../../../src/assets/Events/Frame 1171280051.png', icon: icon4 },
  { name: '义愤不平', image: '../../../src/assets/Events/Frame 1171280052.png', icon: icon5 },
];

const DataView3 = () => {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 表示显示全部

  const handleClick = (index) => {
    setCurrentIndex(currentIndex === index ? -1 : index);
  };

  return (
    <div className="image-stack">
      {/* 图片显示 */}
      {currentIndex === -1
        ? 
            <img
              src={overall}
              className="stacked-image"
            />
        
        : <img
            src={categories[currentIndex].image}
            alt={categories[currentIndex].name}
            className="stacked-image"
          />
      }

      <div className={styles.textArea}>
        <span>网络暴力</span>
        <span>网络暴力呈现出多源头、多样化的复杂形态。面对侵害，即便受害者尝试通过舆论反击或拿起法律武器自保，往往也会陷入维权成本高昂、周期漫长的困境，且最终结果常难遂人愿。更为残酷的是，法律的裁决或许能迟到，但网暴所造成的精神创伤与实质性损害，往往是事后补救所无法弥补的。</span>
      </div>

      {/* overlay 按钮 */}
      <div className={styles.overlay}>
  {currentIndex === -1 ? (
    // 没有选中时，显示按钮列表
    categories.map((cat, idx) => (
      <div
        key={idx}
        className={`icon-wrapper ${currentIndex === idx ? 'active' : ''}`}
        onClick={() => handleClick(idx)}
        style={{
          filter:
            currentIndex === -1 || currentIndex === idx
              ? 'none'
              : 'grayscale(100%) brightness(50%)',
          transform: currentIndex === idx ? 'scale(1.2)' : 'scale(1)',
          transition: 'filter 0.3s ease, transform 0.3s ease',
        }}
      >
        <img src={cat.icon} alt={cat.name} className={styles.buttonicon} />
      </div>
    ))
  ) : (
    // 选中后，显示对应图片
    <img
      src={tab1}
      style={{ width: '170%', height: '100%', objectFit: 'cover' ,marginLeft:'-40%'}}
    />
  )}
</div>

    </div>
  );
};

export default DataView3;

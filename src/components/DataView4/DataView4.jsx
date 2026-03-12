// DataView1.jsx
import './DataView4.css';
import React, { useState } from 'react';

import icon1 from '../../../src/assets/iconsvictim/Vector-1.png';
import icon2 from '../../../src/assets/iconsvictim/Vector-2.png';
import icon3 from '../../../src/assets/iconsvictim/Vector-3.png';
import icon4 from '../../../src/assets/iconsvictim/Vector-4.png';
import icon5 from '../../../src/assets/iconsvictim/Vector-5.png';
import icon6 from '../../../src/assets/iconsvictim/Vector-6.png';
import icon7 from '../../../src/assets/iconsvictim/Vector-7.png';
import icon8 from '../../../src/assets/iconsvictim/Vector8.png';
import Victim from '../../../src/assets/Victim.png';

const categories = [
  { name: '自杀身亡', image: '../../../src/assets/Victim_0.png', icon: icon8 },
  { name: '自杀未遂', image: '../../../src/assets/Victim_1.png', icon: icon1 },
  { name: '自残行为', image: '../../../src/assets/Victim_1.png', icon: icon2 },
  { name: '停止职业活动', image: '../../../src/assets/Victim_1.png', icon: icon3 },
  { name: '退出网络', image: '../../../src/assets/Victim_1.png', icon: icon4 },
  { name: '心理创伤', image: '../../../src/assets/Victim_1.png', icon: icon5 },
  { name: '无严重后果', image: '../../../src/assets/Victim_1', icon: icon6 },
  { name: '其他', image: '../../../src/assets/Victim_1.png', icon: icon7 },
];

const DataView4 = () => {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 表示显示全部

  const handleClick = (index) => {
    setCurrentIndex(currentIndex === index ? -1 : index);
  };

  return (
    <div className="image-stack">
      {/* 图片显示 */}
      {currentIndex === -1 ?
          <img
              src={Victim}
              className="stacked-image"
            />
        : <img
            src={categories[currentIndex].image}
            alt={categories[currentIndex].name}
            className="stacked-image"
          />
      }

      <div className="textArea">
        <span>受害者后果</span>
        <span>对于绝大多数受害者，舆论过后留下的并非平静，而是难以愈合的心理创伤。这种持续性的精神摧残，甚至将部分当事人推向了自残或自杀的绝境。我们在网络上看似随意的轻率发言，极易在指尖轻触间酿成无法挽回的生命悲剧。</span>
      </div>

      {/* overlay 按钮 */}
      <div className="overlay">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`icon-wrapper ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => handleClick(idx)}
            style={{
            filter:
            currentIndex === -1 || currentIndex === idx
                ? 'none' // 显示彩色
                : 'grayscale(100%) brightness(50%)', // 其他按钮灰色
            transform: currentIndex === idx ? 'scale(1.2)' : 'scale(1)', // 选中放大
            transition: 'filter 0.3s ease, transform 0.3s ease', // 平滑动画
        }}

            
          >
            <img src={cat.icon} alt={cat.name} className="button-icon" />
            <span className="button-text">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataView4;

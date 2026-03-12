// DataView1.jsx
import './DataView2.css';
import React, { useState } from 'react';

import icon1 from '../../../src/assets/icons/Group 151.png';
import icon2 from '../../../src/assets/icons/Group 152.png';
import icon3 from '../../../src/assets/icons/Group 153.png';
import icon4 from '../../../src/assets/icons/Group 154.png';
import icon5 from '../../../src/assets/icons/Group 155.png';
import icon6 from '../../../src/assets/icons/Group 156.png';
import icon7 from '../../../src/assets/icons/Group 157.png';
import background from '../../../src/assets/CommentAfter/background.png';

const categories = [
  { name: '直接施暴', image: '../../../src/assets/CommentAfter/AfA6@0.5x.png', icon: icon6 },
  { name: '间接施暴', image: '../../../src/assets/CommentAfter/AfA1@0.5x.png', icon: icon1 },
  { name: '拱火挑事', image: '../../../src/assets/CommentAfter/AfA4@0.5x.png', icon: icon4 },
  { name: '安慰支持', image: '../../../src/assets/CommentAfter/AfA3@0.5x.png', icon: icon3 },
  { name: '义愤不平', image: '../../../src/assets/CommentAfter/AfA7@0.5x.png', icon: icon7 },
  { name: '旁观中立', image: '../../../src/assets/CommentAfter/AfA5@0.5x.png', icon: icon5 },
  { name: '无关言论', image: '../../../src/assets/CommentAfter/AfA2@0.5x.png', icon: icon2 },
];

const DataView2 = () => {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 表示显示全部

  const handleClick = (index) => {
    setCurrentIndex(currentIndex === index ? -1 : index);
  };

  return (
    <div className="image-stack">
      {/* 图片显示 */}
      {currentIndex === -1
        ? categories.map((cat, idx) => (
            <div key={idx} className="image-layer">
              <img src={background} className="background-img" />
              <img
                src={cat.image}
                alt={cat.name}
                className="stacked-image"
              />
            </div>
          ))
        : (
          <div className="image-layer">
            <img src={background} className="background-img" />
            <img
              src={categories[currentIndex].image}
              alt={categories[currentIndex].name}
              className="stacked-image"
            />
          </div>
        )
      }

      <div className="textArea">
        <span>舆论发酵后 - 评论态度与情绪分析</span>
        <span>随着舆论反转，公众开始痛斥之前的网暴行径并声援受害者，为受害者鸣不平。但同时，人们打着伸张正义的旗号，用同样的暴戾手段去围剿和审判所谓的“始作俑者”，网暴在道德的掩护下完成了二次轮回，形成了新的伤害循环。</span>
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

export default DataView2;

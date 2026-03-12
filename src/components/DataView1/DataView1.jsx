// DataView1.jsx
import './DataView1.css';
import React, { useState } from 'react';

import icon1 from '../../../src/assets/icons/Group 151.png';
import icon2 from '../../../src/assets/icons/Group 152.png';
import icon3 from '../../../src/assets/icons/Group 153.png';
import icon4 from '../../../src/assets/icons/Group 154.png';
import icon5 from '../../../src/assets/icons/Group 155.png';
import icon6 from '../../../src/assets/icons/Group 156.png';
import icon7 from '../../../src/assets/icons/Group 157.png';

const categories = [
  { name: '直接施暴', image: '../../../src/assets/CommentBefore/BeA6@0.5x.png', icon: icon6 },
  { name: '间接施暴', image: '../../../src/assets/CommentBefore/BeA1@0.5x.png', icon: icon1 },
  { name: '拱火挑事', image: '../../../src/assets/CommentBefore/BeA4@0.5x.png', icon: icon4 },
  { name: '安慰支持', image: '../../../src/assets/CommentBefore/BeA3@0.5x.png', icon: icon3 },
  { name: '义愤不平', image: '../../../src/assets/CommentBefore/BeA7@0.5x.png', icon: icon7 },
  { name: '旁观中立', image: '../../../src/assets/CommentBefore/BeA5@0.5x.png', icon: icon5 },
  { name: '无关言论', image: '../../../src/assets/CommentBefore/BeA2@0.5x.png', icon: icon2 },
  { name: '点', image: '../../../src/assets/CommentBefore/dian.png', icon: icon2 },

];

const DataView1 = () => {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 表示显示全部

  const handleClick = (index) => {
    setCurrentIndex(currentIndex === index ? -1 : index);
  };

  return (
    <div className="image-stack">
      {/* 图片显示 */}
      {currentIndex === -1
        ? categories.map((cat, idx) => (
            <img
              key={idx}
              src={cat.image}
              alt={cat.name}
              className="stacked-image"
            />
          ))
        : <img
            src={categories[currentIndex].image}
            alt={categories[currentIndex].name}
            className="stacked-image"
          />
      }

      <div className="textArea">
        <span>舆论发酵前 - 评论态度与情绪分析</span>
        <span>在舆论彻底发酵之前，情绪跑在了真相前面。人们容易被片面的言论和失真的信息裹挟，在冲动之下轻率断案、任性发言。正是这些缺乏理性筛选的只言片语，在无形中推波助澜，点燃了网暴的导火索。</span>
      </div>

      {/* overlay 按钮 */}
      <div className="overlay">
        {categories.map((cat, idx) => {
            if (cat.name === '点') return null; // 略过 name 为 '点' 的分类
            return (
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
            );
            })}

      </div>
    </div>
  );
};

export default DataView1;

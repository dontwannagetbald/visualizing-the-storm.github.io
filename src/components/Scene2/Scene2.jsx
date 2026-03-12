import TextType from '../TextType/TextType';
import './Scene2.css';
import DecryptedText from '../DecryptedText/DecryptedText';
import { useState, useEffect } from "react";
import { useRef } from "react";
import { sendToOpenAI } from '../../api/openai';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'; 
import part1start from '../../../src/assets/part1_start.png';
import part1Layer1Bg from '../../../src/assets/part1_layer1.webp';
import part1Layer2Bg from '../../../src/assets/part1_layer2.webp';
import part1Layer3Bg from '../../../src/assets/part1_layer3.webp';
import part1Layer4Bg from '../../../src/assets/part1_layer4.webp';
import word1 from '../../../src/assets/word1.png';
import word2 from '../../../src/assets/word2.png';
import part1Bg from '../../../src/assets/part1_bg.png';
import pic021 from '../../../src/assets/021.png';
import Ellipses from '../../../src/assets/Ellipses Horizontal.png';
import enter from '../../../src/assets/Upload.png';
import emotionPopup from '../../../src/assets/gameEmotion.png';
import sad from '../../../src/assets/scene2/sad.png';
import sad_active from '../../../src/assets/scene2/sad_active.png';
import neural from '../../../src/assets/scene2/neural.png';
import neural_active from '../../../src/assets/scene2/neural_active.png';
import smile from '../../../src/assets/scene2/smile.png';
import smile_active from '../../../src/assets/scene2/smile_active.png';
import gameAlert from '../../../src/assets/gameAlert.png';
import alert from '../../../src/assets/alert.png';
import threeAlert from '../../../src/assets/threealert.png';
import part1Computers from '../../../src/assets/part1_computers.png';
import part1end from '../../../src/assets/part1_end.webp';
import part1ending from '../../../src/assets/part1_ending.png';
import part2BgTop from '../../../src/assets/part2_bg_top.webp';
import part2BgBottom from '../../../src/assets/part2_bg_bottom.webp';
import EmotionPopup from '../EmotionPopup/EmotionPopup';

function Scene2({parallaxRef}) {
  const [showTopPopup, setShowTopPopup] = useState(false);
  const [showRightPopup, setShowRightPopup] = useState(true);
  const [step, setStep] = useState(0); 
  const [flashVisible, setFlashVisible] = useState(true);
  const [comment, setComment] = useState(''); // current input value
  const [openaiResponse, setOpenaiResponse] = useState(''); // store API result
  const [enterPressed, setEnterPressed] = useState(false);
  const sentiments = openaiResponse || {
    positive: 0,
    neutral: 0,
    negative: 0,
  };

  const maxType = Object.keys(sentiments).reduce((a, b) =>
    sentiments[a] > sentiments[b] ? a : b
  );

  useEffect(() => {
    let flashCount = 0;
    const maxFlashes = 5; // 第一个弹窗闪烁次数
    let interval;

    if (step === 0) {
      // 第一个闪烁弹窗
      interval = setInterval(() => {
        setFlashVisible(prev => !prev);
        flashCount += 0.5; // 一次完整闪烁算 1
        if (flashCount >= maxFlashes) {
          clearInterval(interval);
          // 顺序显示三个弹窗
          setTimeout(() => setStep(1), 0);
        }
      }, 500);
    } else if (step >= 1 && step <= 3) {
      // 三个弹窗持续闪烁
      interval = setInterval(() => {
        setFlashVisible(prev => !prev);
      }, 500);
    }

    return () => clearInterval(interval);
    
  }, [step]);

  const renderPopup = (index, color, left) => {
    if (step >= index) {
      return flashVisible && (
        <img
            src={alert}
            style={{ width: '20%', display: 'block' }}
          />
      );
    }
    return null;
  };

  const handleKeyDown = async (e) => {

    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();

      const text = comment.trim();
      if (text) {
        
        try {
          const resp = await sendToOpenAI(text);
          setOpenaiResponse(resp);
          console.log('OpenAI returned:', resp);
          console.log(resp.positive);
          console.log(resp.neutral);
          console.log(resp.negative);

          // 先显示文字上方的小弹窗
          if (!showTopPopup) {
            setShowTopPopup(true);

            // 1秒后显示右上角弹窗
            setTimeout(() => {
              setShowRightPopup(true);
            }, 1000);
          }
        } catch (err) {
          console.error('OpenAI error', err);
        }
      }

      
    }
  };

  const closePopup = () => setShowPopup(false);

  return (
    <>
      <ParallaxLayer
        offset={1}
        speed={0}
        factor={3}
        style={{
          backgroundImage: `url(${part1Bg})`,
          // backgroundColor: '#5269c7ff',
          backgroundSize: 'cover',
        }}
      />

      <ParallaxLayer offset={0.9} speed={0} style={{ pointerEvents: 'none' ,zIndex:100}}>
        <img src={pic021} style={{ width: '100%' }} />
      </ParallaxLayer>
      
    <ParallaxLayer offset={0.6} speed={0} style={{
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <img
          src={Ellipses}
          style={{
            width: '3%',
            display: 'block',
          }}
        />
    </ParallaxLayer>

      <ParallaxLayer offset={1.3} speed={0.4} style={{ pointerEvents: 'none' }}>
        <img src={part1Layer2Bg} style={{ width: '100%' }} />
      </ParallaxLayer>
      
<ParallaxLayer offset={3.2} speed={0} factor={1} style={{ pointerEvents: 'none', position: 'absolute' }}>
        <div style={{ width: '100%', lineHeight: 0 }}>
          {/* <img src={part2BgTop} style={{ width: '100%', display: 'block' }} />
          <img src={part2BgBottom} style={{ width: '100%', display: 'block' }} /> */}
        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={1.3} speed={0.4} style={{ pointerEvents: 'none' }}>
        <img src={part1Layer3Bg} style={{ width: '100%' }} />
      </ParallaxLayer>
      

      <ParallaxLayer offset={1.3} speed={0.6} style={{ pointerEvents: 'none' }}>
        <img src={part1Layer4Bg} style={{ width: '100%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={1.3} speed={0.8} style={{ pointerEvents: 'none' }}>
        <img src={part1Layer1Bg} style={{ width: '100%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={3} speed={0.8} style={{ pointerEvents: 'none',position: 'absolute',
              }}>
        <img src={part1Computers} style={{ width: '100%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={3.8} speed={0} >
        <img src={part1ending} style={{ width: '100%' }} />
      </ParallaxLayer>


      <ParallaxLayer offset={1.7} speed={4} style={{ pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            minWidth: '100px',   // 增大最小宽度以容纳内容
            maxWidth: '40%',     // 增大最大宽度限制
          }}
        >
          <img
            src={word1}
            style={{ width: '100%', display: 'block' }}
          />

          <div
            className="text"
            style={{
              position: 'absolute',
              top: '50%',
              left: '48%',
              transform: 'translate(-36%, -50%)',
              textAlign: 'left',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              width: 'fit-content',
              fontSize: '1.2rem',
            }}
          >
            Hello! Welcome to the year 3026.▎
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={1.7} speed={4} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: '90%',
              left: '50%',
              width: 'fit-content',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              padding: '1rem 4rem',
              fontSize: '1.2rem',
            }}
            className="text text-bg"
          >
            This is an era in which cyberbullying has all but ceased to occur.
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={1.9} speed={4} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: '170%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              width: 'fit-content',
              padding: '2rem 2rem',
              fontSize: '1.1rem',
              textAlign: 'center',
              lineHeight: '1.5',
            }}
            className="text text-bg"
          >
            The background will be supplemented,<br />
            the context will not be easily lost,<br />
            and expressions prone to misinterpretation will be annotated or adjusted.<br />
            People may still hold differing viewpoints,<br />
            but discussions will no longer stray from the facts so readily.<br />
            Public discourse thus remains stable and orderly,<br />
            rarely spiralling out of control.
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={2.1} speed={4} style={{ pointerEvents: 'none' }}>
          <div
            className='text'
            style={{
              position: 'absolute',
              top: '-90%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              backgroundColor: '#030E27',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              padding: '2rem 0.2rem',
              justifyContent: 'center',
              alignItems: 'center', 
              textAlign: 'left',
              
            }}
          >
            {/* 上：4 个 video */}
            <div
              style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
              }}
            >
              
              {Array.from({ length: 4 }).map((_, i) => (
                <video
                  key={i}
                  src="../../../src/assets/gamevideo.mp4"
                  loop
                  muted
                  playsInline
                  autoPlay
                  style={{
                    width: '20%',
                    aspectRatio: '9 / 16',
                    objectFit: 'cover',
                    backgroundColor: '#000',
                    
                  }}
                />
              ))}
            </div>
           <div style={{ width: '90%', lineHeight: '1.5' , fontSize: '1.1rem'}}>
            A video circulating online shows an individual engaging in physical contact with another person in a public setting.<br />
            The footage does not reveal the circumstances leading up to the incident, and the exact details remain unclear.
          </div>
            {/* 下：输入框 */}
            <div style={{ position: "relative", width: "88%" }}>
            {/* 上方文字弹窗 */}
            {showTopPopup && (
              <EmotionPopup 
                sentiments={sentiments} />
            )}

            <input
              type="text"
              placeholder="Leave a comment…"              
              value={comment}
              onChange={(e) => setComment(e.target.value)}              
              onKeyDown={handleKeyDown}
              style={{
                position: 'relative',
                width: '88%',
                padding: '1rem 2.5rem 1rem 1.2rem', // 右边留出图标空间
                fontSize: '1rem',
                color: '#D4F3FF',
                backgroundColor: '#0A2866',
                border: '3px solid #D4F3FF',
                outline: 'none',
                backgroundImage: `url(${enter})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                pointerEvents: 'auto',
              }}
            />
            </div>

             {/* 右上角弹窗 */}
            {showRightPopup && (
              <img
                src={gameAlert}
                alt="弹窗"
                className="blink"

                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  position: 'absolute',
                  bottom: '57%',
                  left: '95%',
                  transform: 'translateX(-50%)',
                }}
              />
            )}
          </div>   
           { showRightPopup &&(
              <img
                src={threeAlert}
                alt="弹窗"
                className="blink"
                style={{
                  maxWidth: '50%',
                  maxHeight: '50%',
                  objectFit: 'contain',
                  position: 'absolute',
                  bottom: '108%',
                  left: '30%',
                }}
              />
            )}         
      </ParallaxLayer>

      <ParallaxLayer offset={2.3} speed={4} style={{ pointerEvents: 'none',display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column',justifyItems: 'center'  }}>
        
          <div
            style={{
              pointerEvents: 'none', // 不影响图片点击
              textAlign: 'center',
              padding: '1.5% 4%',
              bottom:'-30%',
              fontSize: '1rem',
            }}
            className="text text-bg"
          >
          This order stems precisely from a historical event that has been repeatedly cited.
          <br />
          ……
        </div>

        <video
            src="../../../src/assets/part1_words.webm"
            loop
            muted
            playsInline
            autoPlay
            style={{
              marginTop: '1rem',
              marginBottom: '-15rem',
              width: '70%',
              // aspectRatio: '9 / 16',
              objectFit: 'cover',
            }}
          />

        <div
            style={{
              pointerEvents: 'none', // 不影响图片点击
              textAlign: 'center',
              padding: '2% 4%',
              fontSize: '1rem',
            }}
            className="text text-bg"
          >
          Following that incident, efforts were made to prevent similar incidents from recurring at their source.
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={2.4} speed={4} style={{ pointerEvents: 'none',display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column',gap: '5rem' ,justifyItems: 'center'  }}> 
        <div
  style={{
    position: 'absolute',
    top: '200%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    // height: 'auto',  // 可选
  }}
>
  {/* 父容器相对定位 */}
  <div style={{ position: 'relative', width: '100%' }}>
    <img
      src={word2}
      style={{ width: '100%', display: 'block' }}
    />
    {/* 文字绝对定位在图片上 */}
    <div
    className="text"
      style={{
        position: 'absolute',
        top: '20%',     // 距离图片顶部，可调整
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white', // 根据图片颜色调整文字颜色
        textAlign: 'center',
        fontSize: '1rem',
        width:'120%',
        zIndex:100
      }}
    >
      Until recently,<br/>
      experts unearthed vast quantities of early internet data from a digital wasteland.<br/>
      These raw, emotionally charged and increasingly distorted records were collated as historical samples,<br/>
      and have become a crucial foundation for today's information management protocols.<br/>
    </div>
  </div>
</div>

</ParallaxLayer>

       <ParallaxLayer offset={3} speed={1} style={{ pointerEvents: 'none',left:'-20%' }}>
       
                  <div style={{ position: 'relative', width: '120%', display: 'inline-block' }}>
  <img
    src={part1end}
    style={{ width: '115%', display: 'block' }}
  /> 
</div>
</ParallaxLayer>

       <ParallaxLayer offset={2.8} speed={1} style={{ pointerEvents: 'none',display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column',justifyItems: 'center'  }}>

 <div
    className="text"
    style={{
      position: 'absolute',
      bottom: '-95%',   // 👈 距图片底部 10%，可调整
      left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center',
      pointerEvents: 'none',
      width: '100%',
      height:'20%',
      color: 'white', // 如果图片深色背景，可加颜色
      fontSize: '1.2rem',
      // backgroundImage:`url(${part1ending})`,
      // backgroundSize:'cover',
      // zIndex:'0.1'
    }}
  >
    This commemorative day was established to remind future generations:<br/>
    Cyberbullying does not stem from inherent malice,<br/>
    but arises from the progressive distortion of information.▎
  </div>
      </ParallaxLayer>

          

    </>
  );
}


export default Scene2;

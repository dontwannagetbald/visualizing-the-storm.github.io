import { useRef, useState, useEffect } from 'react'
import Scene1 from './components/Scene1/Scene1'
import Scene2 from './components/Scene2/Scene2'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import part1Bg from '../src/assets/part1_bg.webp';
import danmu from '../src/assets/danmuwhole.webp';
import tiaolou from '../src/assets/tiaolou.png';
import startvis from '../src/assets/start_vis.webp';
import part3_word1 from '../src/assets/part3_words/Group 1739332936.png';
import part3_word2 from '../src/assets/part3_words/Group 1739332978.png';
import part3_word3 from '../src/assets/part3_words/Group 1739332909.png';

import part2Girl from '../src/assets/part2_girl.webp';
import PinkGirl from './components/PinkGirl/PinkGirl';
import DataView1 from './components/DataView1/DataView1'
import DataView2 from './components/DataView2/DataView2'
import DataView3 from './components/DataView3/DataView3'
import DataView4 from './components/DataView4/DataView4'
import part3Bg from '../src/assets/part3.webp'
import home from '../src/assets/home.webp'
import './App.css'

function App() {
  const parallax = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let rafId

    const trackScroll = () => {
      if (parallax.current) {
        const next = parallax.current.current
        setScrollY((prev) => (Math.abs(prev - next) > 1 ? next : prev))
      }
      rafId = requestAnimationFrame(trackScroll)
    }

    rafId = requestAnimationFrame(trackScroll)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    const criticalBackgrounds = [
      part2Girl,
      danmu,
      startvis,
      tiaolou,
      part3Bg,
      part3_word1,
      part3_word2,
      part3_word3,
      home,
    ]

    criticalBackgrounds.forEach((src) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = src
    })
  }, [])

  const getOpacity = (page) => {
    if (!parallax.current) return 1

    const startPos = page * parallax.current.space
    const relative = scrollY - startPos
    let opacity = relative / parallax.current.space

    if (opacity > 1) opacity = 1
    if (opacity < 0) opacity = 0

    return opacity
  }

  const currentPage =
  parallax.current ? scrollY / parallax.current.space : 0

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* page number display */}
      <div
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          fontSize: '2rem',
          color: '#D4F3FF',
          fontWeight: 'bold',
          zIndex: 1000,
          pointerEvents: 'none',
          textShadow: '0 0 10px #D4F3FF',
        }}
      >
        {parallax.current ? `Page: ${(scrollY / parallax.current.space).toFixed(2)}` : 'Loading...'}
      </div>
      <Parallax ref={parallax} pages={25}>
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={1}
          style={{
            backgroundImage: `url(${part1Bg})`,
            backgroundSize: 'cover',
            zIndex: 1,
          }}
        >
          <Scene1 />
        </ParallaxLayer>

        <Scene2 parallaxRef={parallax} />

        <ParallaxLayer
          sticky={{ start: 4, end: 12 }}
          style={{
            backgroundImage: `url(${part2Girl})`,
            backgroundSize: 'cover',
            zIndex: -10000,
            // opacity: 1 - getOpacity(10.5),
          }}
        >
          <PinkGirl page={currentPage}  />
        </ParallaxLayer>
        <ParallaxLayer offset={4.6} speed={0.4} style={{ pointerEvents: 'none' ,zIndex:100}}> 
        <div
            className="pinkgirl-card"
            style={{
              pointerEvents: "none",
              textAlign: "center",
              padding: "2% 4%",
              display: "flex",
              flexDirection: "column",
              gap: "35px",
              justifyContent: "center",
              alignItems: "center",
              width: "40%",
              position: "absolute",
              top: "50%",
              left: "50%",
              backgroundColor: "-moz-initial",
              zIndex:10000000,
              fontSize:"1rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                maxWidth: "90%",
                backgroundColor: "#003BA5",
                padding: "1%",
                textAlign: "center",
              }}
            >
              What is Information distortion?
            </span>
            <span>Information distortion refers to the phenomenon whereby, during the dissemination of information, editing, abridgement, retelling, and the interjection of personal perspectives and emotions cause originally complete and specific facts to gradually deviate from their original context. Ultimately, the public perceives this information in a fragmented, simplified, or even erroneous manner.</span>
          </div></ParallaxLayer>

<ParallaxLayer offset={5.4} speed={0.4} style={{ pointerEvents: 'none' ,zIndex:100}}> 
        <div
            className="pinkgirl-card"
            style={{
              pointerEvents: "none",
              textAlign: "center",
              padding: "2% 4%",
              display: "flex",
              flexDirection: "column",
              gap: "35px",
              justifyContent: "center",
              alignItems: "center",
              width: "40%",
              position: "absolute",
              top: "50%",
              left: "50%",
              backgroundColor: "-moz-initial",
              zIndex:10000000,
              fontSize:"1rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                maxWidth: "90%",
                backgroundColor: "#003BA5",
                padding: "1%",
                textAlign: "center",
              }}
            >
              The relationship between Cyberbullying and Information distortion
            </span>
            <span>Within this context, public discussion gradually drifts away from the facts themselves, shifting from understanding the event to taking sides based on stances, emotions, and identities.
This process can evolve into online violence and may also turn bystanders into perpetrators of bullying.</span>
          </div></ParallaxLayer>
{/* 
        <ParallaxLayer
          sticky={{ start: 10, end: 12 }}
          speed={0}
          factor={1}
          style={{
            backgroundImage: `url(${danmu})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: getOpacity(10.5),
            zIndex: 1,
          }}
        /> */}

        <ParallaxLayer
          offset={13}
          speed={0}
          factor={3}
          style={{
            backgroundImage: `url(${startvis})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            zIndex: 1,
          }}
        />

        <ParallaxLayer
          offset={13}
          speed={0}
          style={{
            backgroundImage: `url(${tiaolou})`,
            backgroundSize: '70rem',
            backgroundPosition: 'center',
            top: '20rem',
            zIndex: 10,
          }}
        />
        <ParallaxLayer
          sticky={{ start: 16, end: 20 }}
          style={{
            backgroundColor: 'black',
            opacity: getOpacity(18),
            zIndex: getOpacity(18) > 0.5 ? 10 : 1,
          }}
        >
          <DataView4 />
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 16, end: 20 }}
          style={{
            backgroundColor: 'black',
            opacity: getOpacity(17) - getOpacity(18),
            zIndex: getOpacity(17) - getOpacity(18) > 0.5 ? 10 : 1,
          }}
        >
          <DataView3 />
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 16, end: 20 }}
          style={{
            backgroundColor: 'black',
            opacity: getOpacity(16) - getOpacity(17),
            zIndex: getOpacity(16) - getOpacity(17) > 0.5 ? 10 : 1,
          }}
        >
          <DataView2 />
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 16, end: 20 }}
          style={{
            backgroundColor: 'black',
            opacity: 1 - getOpacity(16),
            zIndex: getOpacity(16) > 0.5 ? 1 : 10,
          }}
        >
          <DataView1 />
        </ParallaxLayer>

        <ParallaxLayer
          offset={21}
          speed={0}
          factor={4}
          style={{
            backgroundImage: `url(${part3Bg})`,
            backgroundSize: 'cover',
            zIndex: 1,
          }}
        />

        <ParallaxLayer
          offset={21.5}
          speed={2}
          style={{
            backgroundImage: `url(${part3_word1})`,
            backgroundSize: '64rem',
            backgroundPosition: 'center center',
            zIndex: 10,
          }}
        />

        <ParallaxLayer
          offset={22.5}
          speed={2}
          style={{
            backgroundImage: `url(${part3_word2})`,
            backgroundSize: '64rem',
            backgroundPosition: 'center center',
            zIndex: 10,
          }}
        />

        <ParallaxLayer
          offset={23}
          speed={2}
          style={{
            backgroundImage: `url(${part3_word3})`,
            backgroundSize: '64rem',
            backgroundPosition: 'center center',
            zIndex: 10,
          }}
        />

        <ParallaxLayer
          offset={21.5}
          speed={0.5}
          factor={1.5}
          style={{
            backgroundImage: `url(${home})`,
            backgroundSize: '70rem',
            zIndex: 1,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </Parallax>
    </div>
  )
}

export default App

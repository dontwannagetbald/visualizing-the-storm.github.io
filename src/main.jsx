import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PinkGirlStandalone from "./debug/PinkGirlStandalone/PinkGirlStandalone";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import part2Girl from '../src/assets/part2_girl.webp';
import "./index.css";

function RootRouter() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const parallax = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId;
    const trackScroll = () => {
      if (parallax.current) {
        setScrollY(parallax.current.current || 0);
      }
      rafId = requestAnimationFrame(trackScroll);
    };

    if (path === "/debug/pinkgirl") {
      rafId = requestAnimationFrame(trackScroll);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [path]);

  const getOpacity = (page) => {
    if (!parallax.current) return 1;
    const startPos = page * parallax.current.space;
    const relative = scrollY - startPos;
    let opacity = relative / parallax.current.space;
    if (opacity > 1) opacity = 1;
    if (opacity < 0) opacity = 0;
    return opacity;
  };

  if (path === "/debug/pinkgirl") {
    return (
      <Parallax ref={parallax} pages={25}>
        <ParallaxLayer
          sticky={{ start: 0, end: 12 }}
          style={{
            backgroundImage: `url(${part2Girl})`,
            backgroundSize: 'cover',
            zIndex: 10,
            opacity: 1 - getOpacity(10.5),
          }}
        >
          <PinkGirlStandalone currentPage={parallax.current?.space ? scrollY / parallax.current.space : 0} />
        </ParallaxLayer>
      </Parallax>
    );
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<RootRouter />);

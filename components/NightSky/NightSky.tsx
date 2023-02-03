import type { CSSProperties } from 'react';
import Particles, { IParticlesProps } from 'react-tsparticles';

const style: CSSProperties = { position: 'absolute', top: 0, right: 0 };
const particlesParams: IParticlesProps['params'] = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 1500,
      },
    },
    line_linked: {
      enable: true,
      opacity: 0.02,
    },
    move: {
      direction: 'right',
      speed: 0.05,
      outMode: 'out',
    },
    size: {
      value: 1,
    },
    opacity: {
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.05,
      },
    },
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: 'push',
      },
    },
    modes: {
      push: {
        particles_nb: 1,
      },
    },
  },
  retina_detect: true,
};

const NightSky = () => {
  return <Particles style={style} height="100vh" width="100vw" params={particlesParams} />;
};

export default NightSky;

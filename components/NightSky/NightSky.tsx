import { CSSProperties, useCallback } from 'react';
import Particles, { IParticlesProps } from 'react-tsparticles';
import { loadStarsPreset } from 'tsparticles-preset-stars';
import type { Engine } from 'tsparticles-engine';

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
    move: {
      direction: 'right',
      speed: 0.05,
      outMode: 'out',
    },
    size: {
      value: 1,
    },
  },
  retina_detect: true,
};

const NightSky = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadStarsPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={style}
      height="100vh"
      width="100vw"
      params={particlesParams}
    />
  );
};

export default NightSky;

import { useCallback, useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const [themeConfig, setThemeConfig] = useState({
    color: "#00d4ff",
    linkOpacity: 0.2,
    particleOpacity: 0.3
  });

  useEffect(() => {
    const updateColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setThemeConfig(isDark ? {
        color: "#00d4ff",
        linkOpacity: 0.2,
        particleOpacity: 0.3
      } : {
        color: "#0055ff", // The dark blue from the name gradient (secondary color)
        linkOpacity: 0.4, 
        particleOpacity: 0.6
      });
    };

    updateColor();
    window.addEventListener('themeChanged', updateColor);
    return () => window.removeEventListener('themeChanged', updateColor);
  }, []);

  const options = {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: themeConfig.color,
        },
        links: {
          color: themeConfig.color,
          distance: 150,
          enable: true,
          opacity: themeConfig.linkOpacity,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: themeConfig.particleOpacity,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      className="absolute inset-0 z-0 pointer-events-auto"
    />
  );
};

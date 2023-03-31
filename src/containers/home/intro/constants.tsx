export const getSpiralPoints = (count: number, radius: number, startAngle: number) => {
  const points = [];
  const angleStep = (Math.PI * 2 * 3) / count; // Math.PI * 2 = 360 degrees
  const radiusStep = radius / count;

  for (let i = 0; i < count; i++) {
    const angle = startAngle + i * angleStep;
    const r = i * radiusStep;

    points.push({
      id: i,
      x: r * Math.cos(angle) - 0.001,
      y: r * Math.sin(angle) - 0.001,
      z: 0,
    });
  }

  return points;
};

export const getRectPoints = (count: number, width: number, height: number) => {
  const points = [];
  const angleStep = (Math.PI * 2) / count;

  for (let i = 0; i < count; i++) {
    let theta = i * angleStep;
    const rectAtan = Math.atan2(height, width);
    const tanTheta = Math.tan(theta);

    while (theta < -Math.PI) {
      theta += Math.PI * 2;
    }

    while (theta > Math.PI) {
      theta -= Math.PI * 2;
    }

    let region;

    if (theta > -rectAtan && theta <= rectAtan) {
      region = 1;
    } else if (theta > rectAtan && theta <= Math.PI - rectAtan) {
      region = 2;
    } else if (theta > Math.PI - rectAtan || theta <= -(Math.PI - rectAtan)) {
      region = 3;
    } else {
      region = 4;
    }

    let xFactor = 1;
    let yFactor = 1;

    switch (region) {
      case 1:
        yFactor = -1;
        break;
      case 2:
        yFactor = -1;
        break;
      case 3:
        xFactor = -1;
        break;
      case 4:
        xFactor = -1;
        break;
    }

    let x = width / 2;
    let y = height / 2;

    if (region === 1 || region === 3) {
      x += xFactor * (width / 2) - width / 2; // "Z0"
      y += yFactor * ((width / 2) * tanTheta) - height / 2;
    } else {
      x += xFactor * (height / (2 * tanTheta)) - width / 2; // "Z1"
      y += yFactor * (height / 2) - height / 2;
    }

    points.push({
      id: i,
      x: x,
      y: y,
      z: 0,
    });
  }

  return points;
};

export const IMAGES = ({ width, height }) => [
  {
    id: 1,
    img: '/images/home/img-1.jpeg',
    x: (width * 0.75) / 5 - width / 2,
    y: (height * 3.75) / 5 - height / 2,
    radius: 150,
  },
  {
    id: 2,
    img: '/images/home/img-2.jpeg',
    x: (width * 4.25) / 5 - width / 2,
    y: (height * 3.75) / 5 - height / 2,
    radius: 112,
  },
  {
    id: 3,
    img: '/images/home/img-3.jpeg',
    x: width / 5 - width / 2,
    y: height / 5 - height / 2,
    radius: 112,
  },
  {
    id: 4,
    img: '/images/home/img-4.jpeg',
    x: (width * 4) / 5 - width / 2,
    y: height / 5 - height / 2,
    radius: 150,
  },
];

export const STEPS = [
  {
    id: 0,
    animationStep: 0,
    content: (
      <div className="relative px-4">
        <div className="max-w-2xl">
          <p>
            Nature can provide <span className="text-blue-600">one third</span> of the climate
            benefits needed to meet Paris Agreement targets.
          </p>
        </div>
      </div>
    ),
    getPositions: ({ width, height, count }) => {
      let pos = [];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width - width / 2;
        const y = -0.75 + Math.random() * height - height / 2;
        const z = 0;
        pos.push({ id: i, x, y, z });
      }
      return pos;
    },
    getAnimations: () => {
      return {
        initial: {
          y: 0.75,
          rotateZ: 0,
        },
        animate: {
          y: 0.75,
          rotateZ: 0,
        },
        transition: {
          duration: 0.1,
        },
      };
    },
    getNoise: () => {
      return 0.5;
    },
  },
  {
    id: 1,
    animationStep: 0,
    content: (
      <div className="relative px-4">
        <div className="max-w-3xl">
          <p>
            But we need more than ambitious commitments. <br />
            We need <span className="text-red-600">action</span>.
          </p>
        </div>
      </div>
    ),
    getPositions: ({ width, height, count }) => {
      let pos = [];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width - width / 2;
        const y = -0.75 + Math.random() * height - height / 2;
        const z = 0;
        pos.push({ id: i, x, y, z });
      }
      return pos;
    },
    getAnimations: () => {
      return {
        initial: {
          y: 0.75,
          rotateZ: 0,
        },
        animate: {
          y: 0.75,
          rotateZ: 0,
        },
        transition: {
          duration: 0.1,
        },
      };
    },
    getNoise: () => {
      return 0.5;
    },
  },
  {
    id: 2,
    animationStep: 2,
    content: (
      <div className="relative px-4 -translate-y-20">
        <div className="w-48 h-48 mx-auto" />
        <div className="absolute w-screen max-w-2xl px-4 mt-10 text-center -translate-x-1/2 left-1/2 top-full">
          <p>Science. Policy. People.</p>

          <p>
            Coming <span className="text-blue-800">together</span> for action.
          </p>
        </div>
      </div>
    ),
    getPositions: ({ radius, count }) => {
      let pos = [];

      for (let i = 0; i < count; i++) {
        const randomAngle = i * (360 / count) - 90 + Math.random() * 180;
        const x = ((radius * 0.6) / 100) * Math.cos((-randomAngle * Math.PI) / 180);
        const y = ((radius * 0.6) / 100) * Math.sin((-randomAngle * Math.PI) / 180);
        const z = 0;
        pos.push({ id: i, x, y, z });
      }
      return pos;
    },
    getAnimations: () => {
      return {
        animate: {
          y: 0.75,
          rotateZ: -360 * (Math.PI / 180),
        },
        transition: {
          duration: 0.1,
          rotateZ: {
            duration: 25,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          },
        },
      };
    },
    getNoise: () => {
      return 0.75;
    },
  },
  {
    id: 3,
    animationStep: 2,
    content: (
      <div className="relative px-4 -translate-y-20">
        <div className="w-48 h-48 mx-auto" />
        <div className="absolute w-screen max-w-2xl px-4 mt-10 text-center -translate-x-1/2 left-1/2 top-full">
          <p>
            To <span className="text-brand-700">protect, manage and restore</span> our natural
            ecosystems — creating jobs, protecting livelihoods, increasing biodiversity, and
            absorbing carbon from the atmosphere.
          </p>
        </div>
      </div>
    ),
    getPositions: ({ radius, count }) => {
      let pos = [];

      for (let i = 0; i < count; i++) {
        const randomAngle = i * (360 / count) - 90 + Math.random() * 180;
        const x = ((radius * 0.6) / 100) * Math.cos((-randomAngle * Math.PI) / 180);
        const y = ((radius * 0.6) / 100) * Math.sin((-randomAngle * Math.PI) / 180);
        const z = 0;
        pos.push({ id: i, x, y, z });
      }
      return pos;
    },
    getAnimations: () => {
      return {
        animate: {
          y: 0.75,
          rotateZ: -360 * (Math.PI / 180),
        },
        transition: {
          duration: 0.1,
          rotateZ: {
            duration: 25,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          },
        },
      };
    },
    getNoise: () => {
      return 0.75;
    },
  },
  {
    id: 4,
    animationStep: 4,
    content: (
      <div className="relative px-4 -translate-y-20">
        <div className="w-48 h-48 mx-auto" />
        <div className="absolute w-screen max-w-2xl px-4 mt-10 text-center -translate-x-1/2 left-1/2 top-full">
          <p className="uppercase tracking-[0.32em]">Coming soon</p>
        </div>
      </div>
    ),
    getPositions: ({ radius, count, startAngle }) => {
      let pos = [];

      for (let i = 0; i < count; i++) {
        const angle = i * (360 / count) - 90 + startAngle;

        const x = (radius / 100) * Math.cos((-angle * Math.PI) / 180);
        const y = (radius / 100) * Math.sin((-angle * Math.PI) / 180);
        const z = 0;
        pos.push({ id: i, x, y, z });
      }
      return pos;
    },
    getAnimations: () => {
      return {
        animate: {
          y: 0.75,
          rotateZ: 0,
        },
        transition: {
          duration: 0.1,
        },
      };
    },
    getNoise: () => {
      return 0.0;
    },
  },
  {
    id: 5,
    animationStep: 4,
    content: (
      <div className="relative px-4 -translate-y-20">
        <div className="w-48 h-48 mx-auto" />
        <div className="absolute w-screen max-w-2xl px-4 mt-10 text-center -translate-x-1/2 left-1/2 top-full">
          <h1 className="text-3xl font-semibold tracking-wider md:text-4xl">naturebase</h1>
          <h2 className="md:text-lg">natural climate solutions in action</h2>
        </div>
      </div>
    ),
    getPositions: ({ radius, count, startAngle }) => {
      let pos = [];

      for (let i = 0; i < count; i++) {
        const angle = i * (360 / count) - 90 + startAngle;

        const x = (radius / 100) * Math.cos((-angle * Math.PI) / 180);
        const y = (radius / 100) * Math.sin((-angle * Math.PI) / 180);
        const z = 0;
        pos.push({ id: i, x, y, z });
      }
      return pos;
    },
    getAnimations: () => {
      return {
        animate: {
          y: 0.75,
          rotateZ: 0,
        },
        transition: {
          duration: 0.1,
        },
      };
    },
    getNoise: () => {
      return 0.0;
    },
  },
];

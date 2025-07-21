export const anim = (variants) => {
  return {
    initial: "initial",
    whileInView: "animate",

    variants,
  };
};
  export const image1Anim={
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.065, 0.760, 0.555, 0.930],
        delay:0.3

      },
    },
  }

  export const image2Anim={
    initial: { x: 50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.065, 0.760, 0.555, 0.930],
        delay:0.6
      },
    },
  }

  export const image3Anim={
    initial: { x: -50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay:0.9
      },
    },
  }
  export const image4Anim={
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay:1.2
      },
    },
  }
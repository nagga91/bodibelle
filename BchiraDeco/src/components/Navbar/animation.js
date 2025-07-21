export const anim = (variants) => {
    return {
      initial: "initial",
      
      animate: "animate",
      exit: "exit",
      variants,
    };
  };
  export const banner = {
    initial:  {opacity:0},
    animate: {
        opacity:1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.02,
      },
    },
  };
  
  export const objectAni = {
    initial: { y: 200 },
    animate: {
      y: 0,
      transition: {
        duration: 0.5,
      },

    },
    exit: {
      y: 200,
      transition: {
        duration: 0.5,
      },
    },
  };
  
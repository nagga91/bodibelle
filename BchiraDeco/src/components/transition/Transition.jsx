import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
const pageTransition = {
    initial: {
        x: "-100%",
        opacity: 0
    },
    animate: {
        x: 0 ,
        opacity: 1,
        transition: {
            duration: 0.5
        }
    },
    exit: {
        x: "-100%",
        opacity: 0,
        transition: {
            duration: 0.5
        }   }
}
function Transition({children}) {
    const [fixed,setFixed] = useState(true)

  return (
    <motion.div    style={{top:"0",width:"100%",height:"100%"}}  className='transition' key={"pageTransition1"} variants={pageTransition} initial="initial" animate="animate" exit="exit">

      {children}
    </motion.div>
  )
}

export default Transition

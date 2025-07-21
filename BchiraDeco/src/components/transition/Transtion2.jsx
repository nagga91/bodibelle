import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"

const pageTransition = {
    initial: {
        x: "100%",
        
        opacity: 0
    },
    animate: {
        x: 0,   
      opacity: 1,
        transition: {
            duration: 0.5
        }
    },
    exit: {
 position:"fixed",
        x: "100%",
        opacity: 0,
        transition: {
            duration: 0.5
        }   }
}
function Transition2({children}) {
    const [fixed,setFixed] = useState(true)
    useEffect(()=>{
        setTimeout(()=>{
            setFixed(false)
        },600)
    },[])
  return (
    <motion.div  style={{position:fixed ?"fixed":"relative" ,top:"0",width:"100%"}}  className='transition2' key={"pageTransition2"} variants={pageTransition} initial="initial" animate="animate" exit="exit">

      {children}
    </motion.div>
  )
}

export default Transition2

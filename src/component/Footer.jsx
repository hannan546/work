import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-slate-800 justify-center flex flex-col items-center  bottom-0 w-full h-12'>
       <div className="logo text-white">&lt;Pass<span className='text-green-400'>OP/&gt;</span></div> 
       <div className="flex justify-center items-center text-white "> Create with <img className='w-8 mx-2' src="public/icon/heart.png" alt="" /> by CodeWithHannan</div>
    </footer>
  )
}

export default Footer

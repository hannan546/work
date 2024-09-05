import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white flex justify-around h-14 font-bold items-center text-2xl'>
      <div className="logo text-white">&lt;Pass<span className='text-green-400'>OP/&gt;</span></div>
        {/* <ul className='flex justify-end gap-9'>
            <a href=""><li>Home</li></a>
            <a href=""><li>About</li></a>
            <a href=""><li>Contact</li></a>
        </ul> */}
        <div className="githup">
          <button className='flex justify-center items-center bg-green-500 px-4 py-1 rounded-3xl'>
          <img className='invert w-9 mx-2'  src=" public/icon/github.svg" alt="" />
          Github</button>
        </div>
    </nav>
  )
}

export default Navbar

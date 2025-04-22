import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-around bg-purple-700 text-white py-3'>
        <div className="logo">
            <span className='font-bold text-xl mx-10'>iTask</span>
        </div>
        <ul className="flex gap-10 mx-10">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar

import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className='flex justify-between bg-[#fea895] text-white py-2'>
                <div className="logo flex">
                    <span className='font-bold text-xl mx-8 flex gap-1'>
                        <img width={30} src="./vite.svg" alt="logo" />
                        zTask
                    </span>
                </div>
                <ul className="flex gap-8 mx-9">
                    <li className='cursor-pointer hover:font-bold transition-all hover:underline'>
                        <a href="https://github.com/SwapnilBhattacharya05">
                            GitHub
                        </a>
                    </li>
                    <li className='cursor-pointer hover:font-bold transition-all hover:underline'>
                        <a href="https://www.linkedin.com/in/swapnil-bhattacharya-357ab527a/">
                            Linkdin
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar

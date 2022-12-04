import React, { useContext, useState, useEffect } from 'react'
import { getCategories } from '../services';
import Link from 'next/link'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import { useRouter } from 'next/router';


const Header = () => {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);

    const router = useRouter();
    
    useEffect(() => {
      getCategories().then((newCategories) => {
        setCategories(newCategories);
        
      });
    }, []);  

    const [nav, setNav] = useState(false)
    const handleNav = () => {
        setNav(!nav)
    }
  return (

    <div className=' container mx-auto px-10 mb-8 '>
        <div className="border-b  lg:inline-block flex items-center justify-between border-white py-7  w-full ">
            <div className='md:float-left block'>
                <Link scroll={false} href="/">
                    <span className='cursor-pointer font-bold text-4xl text-white'>Erdi Serdar</span>
                    <p>
                        <span className=' ml-4 text-gray-500 text-sm '> Austro-Libertarianism</span>
                    </p>
                </Link>
            </div>
           
            <div className=' hidden md:flex w-full lg:float-right lg:contents '>   
                <ul className=''>
                    {categories.map((category, index)=> (
                        
                        <li>
                            <Link className=' '  key={index} href={`/category/${category.slug}`} >
                                <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                    {category.name}
                                </span>
                            </Link>
                        </li>
                        
                    ))}
                </ul>        
            </div>

            {/* Hamburger menu */}
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={30} className=' text-white' /> : <AiOutlineMenu size={30} className='text-white' />}
            </div>

             {/* Mobile menu */}
            <div className= {nav ? ' w-full nav  text-white absolute  mt-3  left-0 flex justify-center text-center z-50' : 'absolute left-[-100%]'}>
                <ul>
                    {categories.map((category, index)=> (
                            <li className='inline'>
                                <Link className=' '  key={index} href={`/category/${category.slug}`} >
                                    <span className='mobile-category-menu md:float-right mt-2 align-middle text-sky-100 ml-4 mb-16 font-semibold cursor-pointer'>
                                        {category.name}
                                    </span>
                                </Link>
                            </li>
                            
                        ))}
                </ul>
            </div>
                


        </div>
                  
    </div>
  );
}

export default Header
import React, { useContext, useState, useEffect } from 'react'
import { getCategories } from '../services';
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'


const Header = () => {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      getCategories().then((newCategories) => {
        setCategories(newCategories);
        
      });
    }, []);  

    

  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className="border-b w-full  max-w-full lg:inline-block flex items-center justify-between border-white py-8  ">
            <div className='md:float-left block'>
                <Link href="/">
                    <span className='cursor-pointer font-bold text-4xl text-white'>Erdi Serdar</span>
                    <p>
                        <span className=' ml-4 text-gray-500 text-sm '> Austro-Libertarianism</span>
                    </p>
                </Link>
            </div>
            <FiMenu className='hamburger lg:hidden float-right text-white h-10 w-10 cursor-pointer' onClick={() => setOpen(!open)} />
            <nav className={`${open ? "block" : "hidden"} lg:float-right lg:contents `}>
                
                <ul className=''>
                    {categories.map((category, index)=> (
                        <li>
                            <Link className=' '  key={index} href={`/category/${category.slug}`} >
                                
                                <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                    {category.name}
                                </span>
                            </Link>
                        </li>
                        // <a key= {index} href={`/category/${category.slug}`} className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>{category.name}</a>
                    ))}
                </ul>        
            </nav>
            
        </div>
                  
    </div>
  );
}

export default Header
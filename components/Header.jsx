import React, { useContext, useState, useEffect } from 'react'
import { getCategories } from '../services';
import Link from 'next/link'



const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      getCategories().then((newCategories) => {
        setCategories(newCategories);
        
      });
    }, []);  

  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className="border-b w-full inline-block border-white py-8">
            <div className='md:float-left block'>
                <Link href="/">
                    <span className='cursor-pointer font-bold text-4xl text-white'>Erdi Serdar</span>
                    <p>
                        <span className=' ml-4 text-gray-500 text-sm '> Austro-Libertarianism</span>
                    </p>
                </Link>
            </div>
            {/* <input type="checkbox" id="hamburger-input" class="burger-shower" />
            <label for="hamburger-input" className='hamburger-menu md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>&#9776;</label> */}
            <div className='hidden md:float-left md:contents categories'>
            
                {categories.map((category, index)=> (
                    <Link key={index} href={`/category/${category.slug}`} >
                        
                        <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                        
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
            
        </div>
                  
    </div>
  );
}

export default Header
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

const Categories = () => {
  //react hooks to get Categories on the top right side of page
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
      
    });
  }, []);
  
  return (
    <div className="bg-gradient shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4 text-white">
        Categories
      </h3>
      {/* Mapping throug categories to create a slug for each */}
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3 text-slate-200`}>{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
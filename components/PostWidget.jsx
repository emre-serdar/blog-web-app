import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts  } from '../services';
import moment from 'moment/moment';


const PostWidget = ({ categories, slug }) => {
  /*React Hooks to set either Related Posts or Recent Posts
    according to slug. no slug=homepage */
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
        
      });
    } else {
    
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
        
      });
    }
  }, [slug]);
  

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 '>
        {/* home page = no slug
            If there is slug, get Related Post, If there is no slug, get Recent Posts*/}
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
        {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className='w-16 flex-none'>
            <img 
                alt={post.title}
                height="60px"
                width="60px"
                className='align-midle rounded-full'
                src={post.featuredImage.url}
              />
          </div>
          <div className='flex-grow ml-4'>
              <p className='text-gray-500 font-xs'>
                {moment(post.date).format('MMM DD, YYYY')}
              </p>
              <Link href={`/post/${post.slug}`} key={post.title} className="text-md">
                  {post.title}
              </Link>
          </div>
          
          
        </div>
      ))}
    </div>
  )
}

export default PostWidget
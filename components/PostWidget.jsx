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
    <div className='bg-gradient shadow-lg rounded-lg p-8 pb-12 mb-8 '>
        {/* home page = no slug
            If there is slug, get Related Post, If there is no slug, get Recent Posts*/}
        <h3 className="text-xl mb-8 font-semibold border-b pb-4 text-white">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
        {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className='w-16 flex-none post-widget-img'>
            <img 
                alt={post.title}
                
                className='align-midle'
                src={post.featuredImage.url}
              />
          </div>
          <div className='flex-grow ml-4'>
              <p className='text-slate-400 font-xs'>
                {moment(post.date).format('MMM DD, YYYY')}
              </p>
              <Link href={`/post/${post.slug}`} key={post.title} className="text-md text-slate-300">
                  {post.title}
              </Link>
          </div>
          
          
        </div>
      ))}
    </div>
  )
}

export default PostWidget
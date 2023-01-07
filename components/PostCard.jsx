import React from 'react'
import Link from 'next/link'
import moment from 'moment/moment'



const PostCard = ({ post }) => {
    
    // excerpt length
    const getExcerpt = (excerpt) => {
        let wordLimit = 22; 
        let wordsArr = excerpt.split(' '); //splittin according to spaces
        if (wordsArr.length < wordLimit) {
            return excerpt;
        }else{
            let result = "";
            for (var i=0; i<=wordLimit; i++){
                result = result + ' ' + wordsArr[i] + ' ';
            }
            result = result + '...'
            return result;
        }

    }


    return (
    <div className="bg-gradient shadow-lg rounded-lg p-0 lg:p-6 pb-12 mb-4">
        <div className="relative h-44 overflow-hidden shadow-md pb-44 mb-6 ">
            <Link href={`/post/${post.slug}`}>
                <img 
                    src={post.featuredImage.url} 
                    alt={post.title}
                    className=" 
                    transition-all absolute h-44 w-full
                    object-cover shadow-lg rounded-t-lg lg:rounded-lg" 
                />
            </Link>

        </div>
        <h1 className="transition duration-100 flex text-center justify-center mb-4 h-20 cursor-pointer text-white hover:text-gray-400 text-xl font-semibold">
            {/* giving post's route/link for each title */}
            <Link href={`/post/${post.slug}`}>
                {post.title}
            </Link>
        </h1>
        <div className="block lg:flex text-center items-center justify-center mb-8 lg:mb-6 lg:justify-around w-full">
            <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                <p className="inline align-middle text-slate-200 ml-2 font-medium text-base">{post.author.name}</p>
            </div>
            <div className='font-medium text-slate-200 '>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className='aling-middle text-base '>
                    {moment(post.date).format('MMM DD, YYYY')}
                </span>
            </div>
        </div>
        <p className='text-center text-sm text-slate-200 font-light px-6 lg:px-0 overflow-hidden lg:h-24 mb-8'>{getExcerpt(post.excerpt)}</p>
        
        {/* setting Countunie Reading button's link to post's slug*/}
        <div className='text-center'>
            <Link href={`/post/${post.slug}`}>
                <span className='transition duration-500 tranform hover:translate-y-1 inline-block btn-grad text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
                    Okumaya devam et
                </span>
            </Link>

        </div>
            
    </div>
    )
}

export default PostCard
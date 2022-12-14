import React from 'react'
import moment from 'moment/moment'
import Link from 'next/link';

const PostDetail = ({ post }) => {
  
  
 
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text; 
   
    //object detection, since content may include text, images, bold-text etc.
    if (obj.bold) {  
      modifiedText = (<b key={index}>{text}</b>);
    }

    if (obj.italic) {
      modifiedText = (<em key={index}>{text}</em>);
    }

    if (obj.underline) {
      modifiedText = (<u key={index}>{text}</u>);
    }
    if (obj.type=='link'){
        modifiedText = (<Link key={index} href={obj.href} className='text-blue-300 '>{obj.children[0].text}</Link>);
        
    }
    if (obj.type=='numbered-list') { 
        
      modifiedText = (<ol key={index}> 
                          {obj.children.map((obje, index) => <li> {obj.children[index].children[0].children[0].text} </li> )}
                      </ol>)
    }
    

    //what to return according to objects detected 
    switch (type) {
      case 'heading-two':
        return <h2 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h2>;
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="indent-4 mb-8 text-justify">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className='mb-3'
          />
        );
      default:
        return modifiedText;
    }
  };



  return (
    <div className='bg-gradient shadow-lg rounded-lg lg:p-8 pb-12 mb-8 p-5  '>
      <div className='relative overflow-hidden shadow-md mb-6'>
        
        <img 
          src={post.featuredImage.url}
          alt={post.title}
          className='object-top xl:h-80 lg:h-48 md:h-60 block ml-auto mr-auto scale-150  rounded-t-lg'
         />
      </div>  
      <div className='px-0 lg:px-0 '>
        <div className='flex items-center mb-8 w-full'>
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 ">
                 <p className="inline align-middle text-slate-200 ml-2 font-medium text-lg">{post.author.name}</p> 
            </div>
            <div className='font-medium text-slate-200 '>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className='aling-middle inline-block'>
                    {moment(post.date).format('MMM DD, YYYY')}
                </span>
            </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold text-white">{post.title}</h1>
        <div className='text-slate-200 text-justify'>
          {post.content.raw.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
              
              return getContentFragment(index, children, typeObj, typeObj.type);
            })}
        </div>  
          
      </div>

    </div>
  )
}

export default PostDetail
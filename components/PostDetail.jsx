import React from 'react'
import moment from 'moment/moment'
import Link from 'next/link';

const PostDetail = ({ post }) => {

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    const effectiveType = type || obj.type;

    if (modifiedText === undefined && obj && obj.children && effectiveType !== 'image' && effectiveType !== 'link' && effectiveType !== 'table' && effectiveType !== 'table_body' && effectiveType !== 'table_row' && effectiveType !== 'table_head') {
      modifiedText = obj.children.map((child, i) => getContentFragment(i, child.text, child, child.type));
    }

    switch (effectiveType) {
      case 'heading-one':
        return <h1 key={index} className="text-3xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h1>;
      case 'heading-two':
        return <h2 key={index} className="text-2xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h2>;
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
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
      case 'link':
        return (
          <Link key={index} href={obj.href} className='text-blue-600 font-semibold hover:underline'>
            {obj.children.map((item, i) => getContentFragment(i, item.text, item, item.type))}
          </Link>
        );
      case 'numbered-list':
        return (
          <ol key={index} className="list-decimal ml-8 mb-8">
            {obj.children.map((item, i) => (
              <li key={i} className="mb-2">
                {item.children.map((child, j) => {
                  const children = child.children.map((grandChild, k) => getContentFragment(k, grandChild.text, grandChild));
                  return getContentFragment(j, children, child, child.type);
                })}
              </li>
            ))}
          </ol>
        );
      case 'bulleted-list':
        return (
          <ul key={index} className="list-disc ml-8 mb-8">
            {obj.children.map((item, i) => (
              <li key={i} className="mb-2">
                {item.children.map((child, j) => {
                  const children = child.children.map((grandChild, k) => getContentFragment(k, grandChild.text, grandChild));
                  return getContentFragment(j, children, child, child.type);
                })}
              </li>
            ))}
          </ul>
        );
      case 'table':
        return (
          <div key={index} className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse border border-gray-300">
              {obj.children.map((child, i) => getContentFragment(i, child.text, child, child.type))}
            </table>
          </div>
        );
      case 'table_head':
        return (
          <thead key={index} className="bg-gray-100">
            {obj.children.map((child, i) => getContentFragment(i, child.text, child, child.type))}
          </thead>
        );
      case 'table_body':
        return (
          <tbody key={index}>
            {obj.children.map((child, i) => getContentFragment(i, child.text, child, child.type))}
          </tbody>
        );
      case 'table_row':
        return (
          <tr key={index} className="border-b border-gray-200">
            {obj.children.map((child, i) => getContentFragment(i, child.text, child, child.type))}
          </tr>
        );
      case 'table_cell':
        return (
          <td key={index} className="p-2 border-r border-gray-200 align-top">
            {obj.children.map((child, i) => {
              const children = child.children.map((grandChild, j) => getContentFragment(j, grandChild.text, grandChild));
              return getContentFragment(i, children, child, child.type);
            })}
          </td>
        );
      case 'table_header_cell':
        return (
          <th key={index} className="p-2 border-r border-gray-200 text-left font-semibold">
            {obj.children.map((child, i) => {
              const children = child.children.map((grandChild, j) => getContentFragment(j, grandChild.text, grandChild));
              return getContentFragment(i, children, child, child.type);
            })}
          </th>
        );
      case 'list-item-child':
        return modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>);
      default:
        let finalContent = modifiedText;
        if (obj) {
          if (obj.bold) {
            finalContent = (<b key={index}>{finalContent}</b>);
          }
          if (obj.italic) {
            finalContent = (<em key={index}>{finalContent}</em>);
          }
          if (obj.underline) {
            finalContent = (<u key={index}>{finalContent}</u>);
          }
        }
        return finalContent;
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
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
          </div>
          <div className='font-medium text-gray-700 '>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className='aling-middle inline-block'>
              {moment(post.date).format('MMM DD, YYYY')}
            </span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold text-gray-800">{post.title}</h1>
        <div className='text-gray-700 text-justify'>
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
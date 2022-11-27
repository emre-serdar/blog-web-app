import React, { useRef, useState, useEffect } from 'react'
import { submitComment } from '../services';

const CommentsForm = ( { slug }) => {
const [error, setError] = useState(false);
const [localStorage, setlocalStorage] = useState(null); //fetching data from local storage
const [showSuccesMessage, setshowSuccesMessage] = useState(false);

//to read the values from user input, and send it to content API.
const commentEl = useRef();
const nameEl = useRef();
const emailEl = useRef();
const storeDataEl = useRef();

//using local storage to save user's name and email
useEffect(() => {
  nameEl.current.value = window.localStorage.getItem('name');
  emailEl.current.value = window.localStorage.getItem('email');
  
}, [])



const handleCommitSubmission = () => {
  setError(false);
  //handling comment errors.
  const { value: comment } = commentEl.current;
  const { value: name } = nameEl.current;
  const { value: email } = emailEl.current;
  const { checked: storeData } = storeDataEl.current;
  
  if (!comment || !name || !email) {
    setError(true);
    return;
  }

  const commentObj = { name, email, comment, slug };

  if(storeData){
    window.localStorage.setItem('name', name);
    window.localStorage.setItem('email', email);
  } else {
    window.localStorage.removeItem('name', name);
    window.localStorage.removeIteam('email', email)
  }
  submitComment(commentObj)
    .then((res) => {
      setshowSuccesMessage(true);
      setTimeout( () => {
        setshowSuccesMessage(false);   
        }, 3000);
      
      })

}
  

  return (
    <div className='bg-gradient shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-white'>CommentsForm </h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea 
          ref={commentEl} 
          className='p-4 outline-none w-full roundend-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 rounded'
          placeholder='Comment'
          name="comment"
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4 lg-grid-cols-2'>
        <input 
          type="text" ref={nameEl}
          className='py-2 outline-none w-full roundend-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 rounded'
          placeholder='Name'
          name="name"
        />
        <input 
          type="text" ref={emailEl}
          className='py-2 outline-none w-full roundend-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 rounded'
          placeholder='Email'
          name="email" 
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true"/>
          <label className='text-gray-200 cursor-pointer ml-2' htmlFor='storeData'>Save my e-mail and name for next time I comment.</label>
        </div>

      </div>

      {error && <p className='text-xs tex-red-500'>All fields are required.</p>}
      
      <div className='mt-8'>
        <button 
          type='button' 
          onClick={handleCommitSubmission}
          className='transiton duration-500 ease hover:bg-indigo-900 inline-block btn-grad text-lg rounded-full text-white px-8 py-3 cursor-pointer'
          >
          PostComment   
        </button>
        {showSuccesMessage && <span className='text-xl float-right font-semi-bold mt-3 text-green-700'>Comment submitted for review.</span>}
      </div>
      

      
    </div>
  )
}

export default CommentsForm;
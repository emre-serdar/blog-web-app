import React from 'react'
import { Author, Categories, Comments, CommentsForm, PostDetail, PostWidget } from '../../components'
import { getPosts, getPostDetails } from '../../services'



const PostDetails = ({ posts }) => {
  const p = posts[0]; // post is an array
  
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
              <PostDetail post={p}/>
              <Author  author={p.author}/>
              <Comments slug={p.slug}/>
              <CommentsForm slug={p.slug} />
              
        </div>
        <div className='col-span-1 lg:col-span-4'>
            <div className='relative lg:sticky top-8'>
                
                <PostWidget categories={p.categories.map((category) => category.slug)} slug={p.slug}  /> 
                
                <Categories />
          

            </div>
        </div>        
      </div>   
    
    </div>
  )
}

export default PostDetails

// unique url or slug = params
export async function getStaticProps({ params }){
  const data = await (getPostDetails(params.slug)) || [];
  
  return {
    props: { posts: data }
  };
}
/*
  Usage of getStaticPaths:
   - next.js has to see all possible dynamic paths,
   so that it can statically render them. 
*/
export async function getStaticPaths(){
  const posts = await getPosts();
  
  return{
    paths: posts.map(({ node: { slug }}) => ({ params: { slug }})),
    fallback: true
  };
}
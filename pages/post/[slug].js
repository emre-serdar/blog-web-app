import React from 'react'
import { useRouter } from 'next/router'
import { Author, Categories, Comments, CommentsForm, PostDetail, PostWidget, Loader } from '../../components'
import { getPosts, getPostDetails } from '../../services'



const PostDetails = ({ post }) => {
  const router = useRouter();
  
  if(router.isFallback){
    return <Loader />
  }

  return (
    <div className='container post-detail-card mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
              <PostDetail post={post}/>
              <CommentsForm slug={post.slug} />
              <Comments slug={post.slug}/>
              
              
        </div>
        <div className='col-span-1 lg:col-span-4'>
            <div className='relative lg:sticky top-8'>
                
                <PostWidget categories={post.categories.map((category) => category.slug)} slug={post.slug}  /> 
                
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
    props: { post: data }
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
import Head from 'next/head'
import { PostCard, Categories, PostWidget } from "../components" ;
import { getPosts, getPosts2 } from '../services';
import { FeaturedPosts } from '../sections';

export default function Home({ posts }) {
  

  return (
    <div className="container mx-auto px-8 mb-8 post-detail-card ">
      <Head>
        <title>Erdi Serdar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <FeaturedPosts />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 '>
        
        <div className="grid lg:grid-cols-3 grid-cols-1 lg:col-span-9 col-span-1 gap-4">
          
            {posts.map((post, index)=><PostCard post={post} key={index} />)}
        </div>  
        
        <div className="lg:col-span-3 ">
            <div className="lg:sticky relative top-8">
              <PostWidget />
                
              <Categories />
            </div>
        </div>


      </div>
      
    </div>
  )
}

//getting the data from API
export async function getStaticProps(){
  const posts = await (getPosts2()) || [];

  return {
    props: { posts }
  }
}

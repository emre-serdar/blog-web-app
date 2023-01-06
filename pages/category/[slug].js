import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, Loader } from '../../components';

const CategoryPost = ({ posts }) => {
  const router = useRouter();
  
  if (router.isFallback) {
    return <Loader />;
  }
 
  
  return (
    
    
    <div className="container mx-auto px-8 mb-8 post-detail-card">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className=" grid lg:grid-cols-3 grid-cols-1 lg:col-span-9 col-span-1 gap-4">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-3">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
    revalidate: 10, // In seconds
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed }, revalidate: 10 };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  console.log(props);

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main className="container">
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .container {
          margin-bottom: 3rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .post {
          background: white;
          width: 49%;
          margin: 5px;
          min-height: 232px;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;

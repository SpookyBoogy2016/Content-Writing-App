import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Content from "../public/Content.png";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <div className=" max-w-7xl mx-auto">
      <Head>
        <title>Content Writing Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 px-5 lg:py-0 ">
        <div className="space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Content
            </span>{" "}
            is a place to write, read, and connect
          </h1>
          <h2>
            Post anything you want to write on any topic and connect with
            everyone!
          </h2>
        </div>
        <div className="hidden md:inline-flex h-32 w-32 lg:h-60 lg:w-60">
          <Image src={Content} />
        </div>
      </div>
      {/* Content Posts */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`} passHref>
            <div className="border rounded-t-lg group cursor-pointer overflow-hidden">
              {post.mainImage && (
                <img
                  className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={urlFor(post.mainImage).url()!}
                />
              )}
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className=" text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by{" "}
                    <span className=" text-sm font-bold">
                      {post.author.name}
                    </span>
                  </p>
                </div>

                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
  },
    description,
    slug,
    mainImage,
    image
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

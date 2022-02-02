import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";
import Content from "../public/Content.png";

export default function Home() {
  return (
    <div className=" max-w-7xl mx-auto">
      <Head>
        <title>Content Writing Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0 ">
        <div className="px-10 space-y-5">
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
        <div>
          <div className="hidden md:inline-flex h-32 w-32 lg:h-60 lg:w-60">
            <Image src={Content} />
          </div>
        </div>
      </div>
    </div>
  );
}

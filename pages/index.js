import Head from "next/head";
import Home from "./home"
export default function Index() {
  return (
    <>
      <Head>
        <title>One Sosho</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
       <Home/>
      </main>
    </>
  );
}

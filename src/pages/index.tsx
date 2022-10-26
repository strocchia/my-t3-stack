import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

import React, { useEffect, useState } from "react";
import { useDarkMode } from "../utils/useDarkMode";

import Navigation from "../components/Navigation";

const Home: NextPage = () => {
  // const [colorTheme, setTheme] = useDarkMode();
  // const { theme, changeTheme } = useDarkMode();
  // const { theme, toggleTheme } = useTheme();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState("");

  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const ctx = trpc.useContext();

  const createNote = trpc.note.createOne.useMutation({
    onMutate(newOne) {
      ctx.note.getAll.cancel();

      const prevData = ctx.note.getAll.getData();

      if (prevData) {
        ctx.note.getAll.setData([...prevData, newOne]);
      }

      return { prevData };

      // ctx.note.getAll.cancel();
      // const prevData = ctx.note.getAll.getData();
      // console.log(prevData, newOne);
      // ctx.note.getAll.setData([...prevData, newOne]);
      // return { prevData };
    },
    onSettled() {
      ctx.note.getAll.invalidate();
    },
    // onSuccess() {
    // alert("success");
    // },
  });

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main>Loading...</main>;
  }

  return (
    <>
      <Head>
        <title>Create T3 Stack - a Note App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="dark:bg-black dark:text-white">
        <main className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
          <Navigation />

          <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            {/* Create <span className="text-purple-300">T3</span> App */}
            T3 Stack - <span className="text-blue-600">Note Taking</span> App
          </h1>

          {/* <button onClick={() => setTheme("dark")}>theme: dark</button> */}
          {/* <button onClick={() => setTheme("light")}>theme: light</button> */}

          <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
            {hello?.data ? <p>{hello.data.greeting}</p> : <p>Loading...</p>}
          </div>

          {/* {!session && (
            <button className="mt-4" onClick={() => signIn()}>
              Login
            </button>
          )}
          {session && (
            <button className="mt-4" onClick={() => signOut()}>
              Logout
            </button>
          )} */}

          {session && (
            <div className="pt-6">
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();

                  if (!session) {
                    alert("Not authorized");
                    setTitle("");
                    setBody("");
                    return;
                  }

                  createNote.mutate({
                    title: title,
                    body: body,
                    type: type || "example",
                  });

                  setTitle("");
                  setBody("");
                }}
              >
                <input
                  type="text"
                  value={title}
                  placeholder="Your title..."
                  maxLength={100}
                  onChange={(evt) => setTitle(evt.target.value)}
                  className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={body}
                  placeholder="Your body..."
                  maxLength={100}
                  onChange={(evt) => setBody(evt.target.value)}
                  className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-neutral-200 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-md border-2 border-zinc-800 p-2 focus:outline"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          <div className="py-10">
            {session ? (
              <Notes />
            ) : (
              <div>
                No authorization. Try{" "}
                <Link
                  className="p-1 text-black hover:bg-blue-500 hover:text-white dark:text-white"
                  href={"/api/auth/signin"}
                >
                  login
                </Link>
              </div>
            )}
          </div>

          {/* <p className="text-2xl text-gray-700">This stack uses:</p>
          <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-3 lg:w-2/3">
            <TechnologyCard
              name="NextJS"
              description="The React framework for production"
              documentation="https://nextjs.org/"
            />
            <TechnologyCard
              name="TypeScript"
              description="Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale"
              documentation="https://www.typescriptlang.org/"
            />
            <TechnologyCard
              name="TailwindCSS"
              description="Rapidly build modern websites without ever leaving your HTML"
              documentation="https://tailwindcss.com/"
            />
            <TechnologyCard
              name="tRPC"
              description="End-to-end typesafe APIs made easy"
              documentation="https://trpc.io/"
            />
            <TechnologyCard
              name="Next-Auth"
              description="Authentication for Next.js"
              documentation="https://next-auth.js.org/"
            />
            <TechnologyCard
              name="Prisma"
              description="Build data-driven JavaScript & TypeScript apps in less time"
              documentation="https://www.prisma.io/docs/"
            />
          </div>
          <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
            {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
          </div> */}

          <AuthShowcase />
        </main>
      </div>
    </>
  );
};

export default Home;

const Notes: React.FC = () => {
  const { data: notes, isLoading } = trpc.note.getAll.useQuery();

  if (isLoading) return <div>Fetching...</div>;

  return (
    <div className="flex flex-col gap-4">
      {notes?.map((note, idx) => {
        return (
          <div key={idx}>
            <p>{note.title}</p>
            <span>- {note.body}</span>
          </div>
        );
      })}
    </div>
  );
};

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {session && (
        <p className="text-2xl text-blue-500">
          Logged in as {session?.user?.name}
        </p>
      )}
      {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )}
      {/* <button
        // className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        className="mt-8 rounded-md border px-4 py-2 shadow-lg"
        onClick={session ? () => signOut() : () => signIn()}
      >
        {session ? "Sign out" : "Sign in"}
      </button> */}
    </div>
  );
};

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
import { useDarkMode } from "../utils/useDarkMode";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import Link from "next/link";

const Navigation = () => {
  // const { theme, toggleTheme } = useTheme();

  const [navbar, setNavbar] = useState(false);

  const { darkMode, toggleDarkMode } = useDarkMode();

  const { data: session } = useSession();

  return (
    <nav className="w-full rounded border border-gray-400 bg-white shadow dark:border-none dark:bg-gray-900">
      <div className="mx-auto justify-between px-4 md:flex md:items-center md:px-8 lg:max-w-7xl">
        <div>
          <div className="flex items-center justify-between py-3 md:block md:py-5">
            <a href="#">
              <h2 className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                T3
              </h2>
            </a>
            <div className="md:hidden">
              <button
                className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li>
                <a
                  href=""
                  className="block rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
                >
                  Home
                </a>
              </li>
              <button
                className="block rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
                onClick={() => toggleDarkMode()}
              >
                Toggle
              </button>
              <button
                // className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
                className="rounded-md border px-4 py-1.5 shadow-lg hover:border-none hover:bg-blue-500"
                onClick={session ? () => signOut() : () => signIn()}
              >
                {session ? "Sign out" : "Sign in"}
              </button>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    // <nav className="w-full bg-gray-800">
    //   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    //     <div className="flex h-16 items-center justify-between">
    //       <div className="flex items-center">
    //         <div className="flex-shrink-0">
    //           {/* <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"> */}
    //           <a href="https://create.t3.gg" target={"_blank"}>
    //             T3
    //           </a>
    //         </div>
    //         <div className="hidden md:block">
    //           <div className="ml-10 flex items-center space-x-8">
    //             {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
    //             <a
    //               href=""
    //               className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
    //               aria-current="page"
    //             >
    //               Home
    //             </a>

    //             <button onClick={() => toggleDarkMode()}>
    //               {darkMode === "light" ? (
    //                 <svg
    //                   id="theme-toggle-dark-icon"
    //                   className="h-8 w-8"
    //                   fill="currentColor"
    //                   viewBox="0 0 24 24"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
    //                 </svg>
    //               ) : (
    //                 <svg
    //                   id="theme-toggle-light-icon"
    //                   className="h-8 w-8"
    //                   fill="currentColor"
    //                   viewBox="0 0 24 24"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
    //                     fillRule="evenodd"
    //                     clipRule="evenodd"
    //                   ></path>
    //                 </svg>
    //               )}
    //             </button>

    //             <button
    //               // className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
    //               className="rounded-md border px-4 py-1.5 shadow-lg hover:border-none hover:bg-blue-500"
    //               onClick={session ? () => signOut() : () => signIn()}
    //             >
    //               {session ? "Sign out" : "Sign in"}
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navigation;

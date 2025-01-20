"use client";

import Image from "next/image";
import { BackgroundLines } from "./ui/background-lines";
import { ContainerScroll } from "./ui/container-scroll-animation";
import WorldMap from "./ui/world-map";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

const dots = [
  {
    start: { lat: 20.5937, lng: 78.9629, label: "India" },
    end: { lat: 37.0902, lng: -95.7129, label: "USA" },
  },
  {
    start: { lat: 51.1657, lng: 10.4515, label: "Germany" },
    end: { lat: 48.8566, lng: 2.3522, label: "France" },
  },
  {
    start: { lat: -25.2744, lng: 133.7751, label: "Australia" },
    end: { lat: -40.9006, lng: 174.886, label: "New Zealand" },
  },
  {
    start: { lat: 35.6895, lng: 139.6917, label: "Japan" },
    end: { lat: 55.7558, lng: 37.6173, label: "Russia" },
  },
];

export function Landing() {
  return (
    <>
      <BackgroundLines className="bg-zinc-950 ">
        <div className="h-full  w-full flex flex-col items-center justify-center">
          {" "}
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            Web IDE, <br /> Code Intelligence
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
            AI powered code completion, code analysis, code refactoring, code
            debugging, code navigation, code linting, code formatting
          </p>
        </div>
      </BackgroundLines>

      {/* <BackgroundLines className="bg-zinc-950 flex items-center justify-center w-full flex-col px-4">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Web IDE, <br /> Code Intelligence
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          AI powered code completion, code analysis, code refactoring, code
          debugging, code navigation, code linting, code formatting
        </p>
      </BackgroundLines> */}
      <WorldMap dots={dots} />

      {/* <ContainerScroll
        titleComponent={"Web IDE..."}
        children={
          <div className="w-full h-full bg-red-700 flex justify-center items-center">
            <Image
              src="/dashboard.png"
              alt="dashboard"
              width={1100}
              height={1100}
              className="w-full h-full rounded-lg"
            />
          </div>
        }
      /> */}

      <div className="flex text-white bg-white dark:bg-zinc-800 flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold ">
                Unleash the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Scroll Animations
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/dashboard.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </>
  );
}

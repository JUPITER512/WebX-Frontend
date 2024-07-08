import React from "react";
import { HeroHighlight } from "../../Components/Background.jsx";
import { FlipWords } from "../../Components/Flipwords.jsx";
import ThemeSwitcher from "../../Components/themeSwitcher.jsx";
function Index({ children }) {
  return (
    <>
      <HeroHighlight>
        <div className="absolute right-4 top-4 ">
          <ThemeSwitcher />
        </div>
        <div className="p-10">
          <span className="z-10 text-5xl select-none	 my-2 font-Playwrite text-neutral-900 dark:text-neutral-100 flex items-center justify-center flex-col gap-2 md:flex-row">
            <FlipWords
              words={["Smart", "Inteligent", "Accessible"]}
              duration={3000}
              className={"text-5xl font-Playwrite inline-block "}
            />
            <p>Ai</p>
          </span>
          <p className="z-10 text-3xl text-center my-4 font-Playwrite text-neutral-900 dark:text-neutral-100 select-none	 ">
            For Everthing <span>WebX</span>
          </p>
          {children}
        </div>
      </HeroHighlight>
    </>
  );
}

export default Index;

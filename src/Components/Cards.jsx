import { cn } from "../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { selectedAiModel } from "../app/userData";
import { useRecoilValue, useSetRecoilState } from "recoil";
export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const setAiModelValue = useSetRecoilState(selectedAiModel);
  async function hanldeOnclick(id, name) {
    console.log("Selected Model is ", id);
    setSelectedCardId(id);
    setAiModelValue(id);
  }
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <button
          key={item?.id}
          onClick={() => {
            hanldeOnclick(item?.id, item?.title);
          }}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-indigo-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card
            className={`${
              selectedCardId == item?.id
                ? "bg-slate-500 dark:bg-slate-500 dark:text-black"
                : ""
            }`}
          >
            <CardTitle className={"text-whiten dark:text-whiten"}>
              {item.title}
            </CardTitle>
            <CardDescription className={"text-whiten dark:text-whiten"}>
              {item.description}
            </CardDescription>
          </Card>
        </button>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn(" font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({ className, children }) => {
  return (
    <p className={cn("mt-8  tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </p>
  );
};

import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("themeSwitcherValue") || "light"
    );

    const handleChange = (event) => {
        if (event.target.checked){
            setTheme('dark')
        }else{
            
            setTheme('light')
        }
    };

    useEffect(() => {
        localStorage.setItem("themeSwitcherValue", theme);
        document.querySelector("html").classList.remove("dark", "light");
        document.querySelector("html").classList.add(theme);
    }, [theme]);    

    return (
        <>
            <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" onChange={handleChange} className="sr-only peer" />
                <div className="relative w-11 h-6  rounded-full peer bg-black dark:bg-gray-300">
                    <motion.div
                        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white dark:bg-black rounded-full shadow-md"
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        style={{
                            left: theme=='dark' ? 'calc(100% - 1.25rem)' : '0.125rem',
                        }}
                    />
                </div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {theme.toUpperCase()}
                </span>
            </label>
        </>
    );
};

export default ThemeSwitcher;

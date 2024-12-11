import React from 'react';

const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`flex items-center group relative z-10 w-fit overflow-hidden cursor-pointer rounded-full px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span className="relative inline-flex items-center overflow-hidden font-general text-xs uppercase gap-2">
        {title}
        {rightIcon && <span>{rightIcon}</span>}
      </span>
    </button>
  );
};

export default Button;

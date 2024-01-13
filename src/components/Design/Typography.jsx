// const Heading = () =>{

// }

// const SubHeading = () =>{

// }

// const content = () =>{

// }
import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const PrimaryHeading = ({ children, className = "" }) => {
  return (
    <h1 className={twMerge("text-4xl font-bold mb-4", className)}>
      {children}
    </h1>
  );
};

const SubHeading = ({ children, className = "" }) => {
  return (
    <h2 className={twMerge("text-2xl font-bold mb-3", className)}>
      {children}
    </h2>
  );
};

const Content = ({ children, className = "" }) => {
  return (
    <p className={twMerge("text-base leading-6", className)}>{children}</p>
    //text-2xl text-gray-800 md:text-[35px]  mb-5 mt-5  uppercase  '
  );
};

//lable:CreateListing.jsx
const Labeled = ({ children, className = "" }) => {
  return (
    <label
      className={twMerge(
        "text-sm font-bold text-gray-500 tracking-wide",
        className
      )}
    >
      {children}
    </label>
  );
};

PrimaryHeading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SubHeading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Labeled.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export { PrimaryHeading, SubHeading, Content, Labeled };

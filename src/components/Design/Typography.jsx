import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const PrimaryHeading = ({ children, className = "" }) => {
  return (
    <h1 className={twMerge("lg:text-4xl text-2xl font-bold ", className)}>
      {children}
    </h1>
  );
};

const SubHeading = ({ children, id, className = "" }) => {
  return (
    <h2
      id={id}
      className={twMerge("md:text-2xl font-bold text-grey-900 my-3", className)}
    >
      {children}
    </h2>
  );
};

// const SubSectionHeading = ({ children, className = "" }) => {
//   return (
//     <h3 className={twMerge("text-xl mb-2 mt-4", className)}>{children}</h3>
//   );
// };

const Content = ({ children, className = "" }) => {
  return (
    <p className={twMerge("text-base leading-6", className)}>{children}</p>
    //text-2xl text-gray-800 md:text-[35px]  mb-5 mt-5  uppercase  '
  );
};

//lable:CreateListing.jsx
const Label = ({ children, className = "" }) => {
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

//terms and condition
// const LinkTypography = ({ href, children, icon, className }) => (
//   <a
//     href={href}
//     className={twMerge(
//       "custom-hover cursor-pointer flex items-center",
//       className
//     )}
//   >
//     {icon && React.cloneElement(icon, { className: "mr-2" })}
//     {children}
//   </a>
// );

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

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// SubSectionHeading.propTypes = {
//   children: PropTypes.node.isRequired,
//   className: PropTypes.string,
// };
// LinkTypography.propTypes = {
//   href: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
//   icon: PropTypes.element, // If an icon is provided, it should be a React element
//   className: PropTypes.string,
// };
export { PrimaryHeading, SubHeading, Content, Label };

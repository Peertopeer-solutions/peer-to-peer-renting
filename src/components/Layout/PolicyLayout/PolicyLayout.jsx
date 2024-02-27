import React from "react";
import { PrimaryHeading } from "../../Design/Typography";

const PolicyLayout = ({ pageTitle, children }) => {
  const gradientBackground = {
    background:
      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 0%, rgba(196,212,250,1) 100%)",
  };

  return (
    <>
      <div
        className="bg-sky-500  pt-3 pb-1 mb-1 flex items-center justify-center"
        style={{ width: "1305px" }}
      >
        <PrimaryHeading>{pageTitle}</PrimaryHeading>
      </div>
      <br />
      <body>
        <div className="container mx-auto md-5  " style={gradientBackground}>
          {children}
        </div>
      </body>
    </>
  );
};

export default PolicyLayout;

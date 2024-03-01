import React from "react";
import { PrimaryHeading } from "../../Design/Typography";

const PolicyLayout = ({ pageTitle, children }) => {
  return (
    <>
      <div
        className="pt-3 pb-1  mb-1 flex items-center justify-left"
        style={{
          width: "1305px",
          borderBottom: "2px solid lightgray",
        }}
      >
        <PrimaryHeading>{pageTitle}</PrimaryHeading>
      </div>
      <br />
      <body>
        <div className=" mx-auto md-5  justify-left">{children}</div>
      </body>
    </>
  );
};

export default PolicyLayout;

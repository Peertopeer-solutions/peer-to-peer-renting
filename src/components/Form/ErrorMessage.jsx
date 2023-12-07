import React from 'react'

const ErrorMessage = ({children}) => {
  if (!children) return null; // Render nothing if no children

    return (
        <p className="text-red-500 text-sm mt-1 font-light">{children}</p>
    );
}

export default ErrorMessage

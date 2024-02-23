
import React, { useState, useEffect } from 'react';
import { SearchBox } from 'react-instantsearch-dom';

const AnimatedSearchBox = () => {
  const PLACEHOLDERS = [
    "This is an animated placeholder",
    "Search for green hoodie",
    "Search for our latest items",
    "Find your favorite movie",
  ];
  const [placeholder, setPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const words = PLACEHOLDERS[placeholderIndex].split(' ');
    if (wordIndex < words.length) {
      const nextWord = words[wordIndex];
      setPlaceholder((current) => current + (current ? ' ' + nextWord : nextWord));
      const timeoutId = setTimeout(() => {
        setWordIndex(wordIndex + 1);
      }, 500); // Time delay between words

      return () => clearTimeout(timeoutId);
    } else {
      // After all words are displayed, wait some time before showing the next placeholder
      const timeoutId = setTimeout(() => {
        setPlaceholder('');
        setWordIndex(0);
        setPlaceholderIndex((placeholderIndex + 1) % PLACEHOLDERS.length);
      }, 2000); // Time delay before the next placeholder

      return () => clearTimeout(timeoutId);
    }
  }, [wordIndex, placeholderIndex]);

  return (
    <SearchBox 
      translations={{ placeholder: placeholder || 'Start typing...' }} 
      classNames={{
        root: ' w-[100px] ',
        form: 'flex items-center border border-gray-300 rounded-2xl focus:outline-none',
        input: 'flex w-full h-16 px-4 text-sm focus:outline-none',
        submit: 'flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white',
        reset: 'flex items-center justify-center w-16 h-16 text-gray-600',
      }}
    />
  );
};

export default AnimatedSearchBox;


import React, { useEffect, useState } from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch  ,Hits,Highlight,connectSearchBox, Stats,connectStateResults  } from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';





const CustomSearchBox = ({ currentRefinement, refine, setSearchQuery }) => {

  const PLACEHOLDERS = [
    "Search for camera",
    "Search for shoes",
    "Search for Riding jacket",
    // More placeholders can be added here
  ];
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPlaceholder = PLACEHOLDERS[placeholderIndex];

    if (charIndex < currentPlaceholder.length) {
      // Animate adding characters
      const timeoutId = setTimeout(() => {
        setAnimatedPlaceholder(current => current + currentPlaceholder[charIndex]);
        setCharIndex(charIndex + 1);
      }, 200); // Speed of adding characters

      return () => clearTimeout(timeoutId);
    } else {
      // Move to the next placeholder after a pause
      const timeoutId = setTimeout(() => {
        setPlaceholderIndex((placeholderIndex + 1) % PLACEHOLDERS.length);
        setAnimatedPlaceholder('');
        setCharIndex(0);
      }, 2000); // Pause time at the end of a placeholder

      return () => clearTimeout(timeoutId);
    }
  }, [charIndex, placeholderIndex]);

  const onChange = (e) =>{
    setSearchQuery(e.target.value)
    refine(e.target.value)
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="container text-sm  lg:text-lg  flex  lg:my-6 items-center rounded-full shadow-xl p-1 bg-gray-100 lg:h-16">
    <input
      type="text"
      placeholder={animatedPlaceholder}
      className="bg-gray-100 p-2 md:p-2 ml-3 w-full xl:w-3/4 rounded-l-full h-9 focus:outline-none"
      value={currentRefinement}
      onChange={onChange}
    />
 
    {currentRefinement ?(
      <button
        onClick={() => {
          refine('')
          setSearchQuery(null)
        }}
        className="ml-2 bg-gray-200 text-gray-600  rounded-full shadow-lg rounded-r-full w-2/6 p-2 lg:p-3"
        type="button"
      >
        Clear 
      </button>
    ):(
      <button 
      type="submit"
      className="ml-2 rounded-full shadow-lg rounded-r-full bg-blue-700 text-white w-2/6 p-2 lg:p-3"
    >
      Search
    </button>
    )}̀
  </form>

  );
};

const  Hit= ({ hit }) =>   {
  const categoryEncoded = encodeURIComponent(hit.category);
  const productPagePath = `/${categoryEncoded}/${hit.objectID}`;
  console.log("Rendering hit:", hit);

  return (
 
       <Link className='my-2 mx-2 ' to={productPagePath}>
      <div className='grid grid-cols-3 '>
        <div className='w-16 aspect-[4/3]'>
          <img src={hit.imgUrls} alt="" />
        </div>
        <div className='flex flex-col items-start'>
        <h1 className='line-clamp-1'>
      <Highlight  attribute="title" hit={hit} tagName="mark" />
      </h1>
      <h1 className='text-sm'> 
      Price
      </h1>
        </div>
        
      </div>
     
    </Link>

   
  );
}

const ConnectedSearchBox = connectSearchBox(CustomSearchBox);



const Search = () => {
  const [searchQuery, setSearchQuery] = useState(null)

  const algoliaClient = algoliasearch('H9T23IH958', '3601a5e76fd24a71d1825f5205e6c105');
  let debounceTimer;
const debounceDelay = 400;
  const searchClient = {
    ...algoliaClient,
    async search(requests) {
      // Clear any pending debounce timer
      if (debounceTimer) clearTimeout(debounceTimer);
  
      return new Promise((resolve, reject) => {
        debounceTimer = setTimeout(() => {
          const hasQuery = requests.some(({ params }) => params.query);
  
          if (!hasQuery) {
            // Resolve with a structure mimicking an empty Algolia response
            resolve({
              results: requests.map(request => ({
                hits: [],
                nbHits: 0,
                page: request.params.page || 0,
                nbPages: 0,
                hitsPerPage: request.params.hitsPerPage || 20,
                exhaustiveNbHits: true,
                query: request.params.query,
                params: request.params,
                processingTimeMS: 0
              }))
            });
          } else {
            // Perform the actual search for non-empty queries
            algoliaClient.search(requests).then(resolve, reject);
          }
        }, debounceDelay);
      });
    }
  };

  return (
    <div>
      <InstantSearch 
      searchClient={searchClient}  
      indexName="Listing" 
      insights={true}
      >
      <div className="">
      <ConnectedSearchBox setSearchQuery={setSearchQuery} />
     {searchQuery && <Stats className='text-gray-500 '/>}
      <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
    </div>
  )
}


export default Search
import { useState, useRef } from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Hits, InstantSearch, SearchBox, Configure } from 'react-instantsearch';

import { Hit } from './Hit';

const searchClient = algoliasearch(
    import.meta.env.VITE_REACT_APP_ALGOLIA_APP_ID,
    import.meta.env.VITE_REACT_APP_ALGOLIA_SEARCH_KEY
);

export const Search = () => {
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [searchKey, setSearchKey] = useState(0);
    const [query, setQuery] = useState('');
    const searchBoxRef = useRef(null);
    const hitsContainerRef = useRef(null);

    const handleStateChange = ({ uiState }) => {
        const {
            stayNest: { query },
        } = uiState;
        setQuery(query);

        // Clear any existing timeout
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout to trigger after a short delay
        setTypingTimeout(
            setTimeout(() => {
                // Call your function here when the user stops typing
                console.log('User stopped typing. Query:', query);
                console.log(Hit);
                setSearchKey((prevKey) => prevKey + 1);
            }, 300)
        ); // Adjust the delay (300ms) as needed
    };

    const handleBlur = () => { 
        if (searchBoxRef.current) {
            const input = searchBoxRef.current.querySelector('input');
            if (input) {
                input.value = '';
                setSearchKey((prevKey) => prevKey + 1); 
            }
        }
    };

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName="stayNest"
            onStateChange={handleStateChange}
        >
            <Configure hitsPerPage={5} />

            <div className='relative'>
                <SearchBox
                    placeholder="Search"
                    searchAsYouType={true}
                    classNames={{
                        root: 'bg-white p-3 rounded-xl shadow-md border',
                        form: 'flex w-full',
                        input: 'w-full focus:outline-none',
                        submitIcon: '',
                      }}
                    ref={searchBoxRef} // Attach ref to the SearchBox
                    onBlur={handleBlur} 
                />
                <div ref={hitsContainerRef} className="absolute top-full left-0 w-full z-50 bg-white mt-2 rounded-xl border">
                {query && ( // Conditionally render Hits
                    <Hits key={searchKey} hitComponent={Hit} className='p-2'/>
                )}
                </div>
            </div>

        </InstantSearch>
    );
};

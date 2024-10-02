import { useState } from 'react';
''
import { liteClient as algoliasearch } from 'algoliasearch';
import { Hits, InstantSearch, SearchBox, Configure} from 'react-instantsearch';


import { Hit } from './Hit';

const searchClient = algoliasearch(
    import.meta.env.VITE_REACT_APP_ALGOLIA_APP_ID,
    import.meta.env.VITE_REACT_APP_ALGOLIA_SEARCH_KEY
);

export const Search = () => {
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [searchKey, setSearchKey] = useState(0);

    const handleStateChange = ({ uiState }) => {
        const { stayNest: { query } } = uiState; 

        // Clear any existing timeout
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout to trigger after a short delay
        setTypingTimeout(setTimeout(() => {
            // Call your function here when the user stops typing
            console.log("User stopped typing. Query:", query);
            console.log(Hit)
            setSearchKey(prevKey => prevKey + 1); 
        }, 300)); // Adjust the delay (300ms) as needed
    }

    return (
        <InstantSearch searchClient={searchClient} indexName="stayNest" onStateChange={handleStateChange}>
            <Configure hitsPerPage={5} />
            <div className="ais-InstantSearch">
                <SearchBox
                    placeholder="Search"
                    className='input input-bordered w-24 md:w-auto flex items-center'
                    searchAsYouType={true}
                />
                    <div className="">
                        <Hits key={searchKey} hitComponent={Hit}/>
                    </div>
            </div>
        </InstantSearch>
    );
};

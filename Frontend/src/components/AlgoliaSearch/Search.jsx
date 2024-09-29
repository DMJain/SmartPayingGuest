import { useState } from 'react';

import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Hits, InstantSearch, SearchBox, Configure } from 'react-instantsearch';

import { Hit } from './Hit';

const searchClient = algoliasearch(
    import.meta.env.VITE_REACT_APP_ALGOLIA_APP_ID,
    import.meta.env.VITE_REACT_APP_ALGOLIA_SEARCH_KEY
);

export const Search = () => {
    const [showHits, setShowHits] = useState(false);

    return (
        <InstantSearch searchClient={searchClient} indexName="movie">
            <Configure hitsPerPage={5} />
            <div className="ais-InstantSearch">
                <SearchBox
                    placeholder="Search"
                    className='input input-bordered w-24 md:w-auto flex items-center'
                    searchAsYouType={false}
                    onFocus={() => setShowHits(true)}
                    onBlur={() => setShowHits(false)}
                />
                {showHits && (
                    <div className="absolute top-20 w-64 max-h-96 overflow-y-auto bg-base-100 border border-secondary z-10 p-4 rounded-lg shadow-2xl">
                        <Hits hitComponent={Hit}/>
                    </div>
                )}
            </div>
        </InstantSearch>
    );
};

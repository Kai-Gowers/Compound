import './SearchResults.css';
import { SearchResult } from './SearchResult';
import { SearchPage } from './SearchPage';

export function SearchResults({ searchResults }) {
    
    return (
        <div className="search-results">

            {searchResults.map((searchResult) => {
                return (
                    <SearchResult searchResult={searchResult}/>
                );
            })}

        </div>
    );

}
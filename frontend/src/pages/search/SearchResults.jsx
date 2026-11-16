import './SearchResults.css';
import { SearchResult } from './SearchResult';

export function SearchResults({ searchResults }) {
    
    return (
        <div className="search-results">

            {searchResults.map((searchResult) => {
                return (
                    <SearchResult key={searchResult.id} searchResult={searchResult}/>
                );
            })}

        </div>
    );

}

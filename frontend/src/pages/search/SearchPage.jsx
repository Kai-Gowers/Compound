import './SearchPage.css';
import { useState } from 'react';

import { api } from "../../api/client";
import { SearchResults } from './SearchResults'

export function SearchPage() {

    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    const searchResult = async (prefix) => {
        try {
            const response = await api.get(`/friends?num_users=${10}&search_prefix=${prefix}`);
            setUsers(response.data);
            setError("");
        } catch (error) {
            setError("Failed to search for users");
        }
    }

    function saveSearchText(event) {
        const next = event.target.value
        setSearchText(next);
        searchResult(next);
    }

    // ** NEW API ENDPOINT NEEDED, A SEARCH QUERY** 
    // Every time that the input changes and it is non-empty, we show a truncated list (10) of users matching that search
    // So, we need to add an API endpoint that takes in a query param with the prefix in the search and returns at most 10 users matching that search
    // if there are no users matching the search, we say no users beginning with ___


    // We don't even need a button to send the query, it should automatically happen with every new letter


    // DISPLAYING THE USERS
    // We need to have new UserSearchDisplay component in which we go through the list of users returned by the query and add one of those UserSearchDisplay objects to the container
    
    // USER attribute
    // users need to have a username attribute that they set so that we can search


    return (
        <div>
            <div className="search-input-contiainer">
                <input
                    placeholder="Search for a User"
                    size="30"
                    onChange={saveSearchText}
                    value={searchText}
                    className="search-input"
                />

                <button>
                    Send
                </button>
            </div>

            <SearchResults searchResults={users}/>

        </div>
    );

}
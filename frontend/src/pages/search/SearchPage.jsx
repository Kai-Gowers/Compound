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

    
    // USER attribute
    // users need to have a username attribute that they set so that we can search by that. Right now we have to search by email which is bad.


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
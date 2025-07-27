import React, { useState, useEffect, useCallback } from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
    const { searchTerm, setSearchTerm } = useRecipeStore(state => ({
        searchTerm: state.searchTerm,
        setSearchTerm: state.setSearchTerm
    }));

    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

    // Memoize the setSearchTerm function to prevent unnecessary re-renders
    const debouncedSetSearchTerm = useCallback(
        (term) => {
            setSearchTerm(term);
        },
        [setSearchTerm]
    );

    // Debounce search to avoid too many updates
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            debouncedSetSearchTerm(localSearchTerm);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [localSearchTerm, debouncedSetSearchTerm]);

    const handleInputChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    const handleClearSearch = useCallback(() => {
        setLocalSearchTerm('');
        debouncedSetSearchTerm('');
    }, [debouncedSetSearchTerm]);

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Search recipes by name, description, or ingredients..."
                    value={localSearchTerm}
                    onChange={handleInputChange}
                    className="search-input"
                    aria-label="Search recipes"
                />
                <div className="search-icons">
                    {localSearchTerm && (
                        <button
                            onClick={handleClearSearch}
                            className="clear-search-btn"
                            aria-label="Clear search"
                            title="Clear search"
                        >
                            ✕
                        </button>
                    )}
                    <span className="search-icon" aria-hidden="true">🔍</span>
                </div>
            </div>
            {searchTerm && (
                <div className="search-status">
                    <span className="search-results-text">
                        Searching for: "<strong>{searchTerm}</strong>"
                    </span>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
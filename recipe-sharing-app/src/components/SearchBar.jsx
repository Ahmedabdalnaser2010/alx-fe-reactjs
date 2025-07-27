import React, { useState, useEffect } from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
    const { searchTerm, setSearchTerm } = useRecipeStore(state => ({
        searchTerm: state.searchTerm,
        setSearchTerm: state.setSearchTerm
    }));

    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

    // Debounce search to avoid too many updates
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearchTerm(localSearchTerm);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [localSearchTerm, setSearchTerm]);

    const handleInputChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    const handleClearSearch = () => {
        setLocalSearchTerm('');
        setSearchTerm('');
    };

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
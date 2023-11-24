import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
    return (
        <>
            <input
                type="search"
                placeholder="Filter"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="form-control mb-3"
            />
        </>
    )
}

export default LocalSearch;
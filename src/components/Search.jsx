import React, { useState } from 'react'
import { Button, Input } from 'antd'

const Search = ({ handleSearch, getData, dataIndex }) => {
  const [searchRef, setSearchRef] = useState({})
  const setSearch = () => c => {
    setSearchRef(c)
  }
  const onSearch = phrase => {
    if (phrase) {
      handleSearch(dataIndex, phrase)
    }
  }
  const handleSearchOnClick = () => {
    const phrase = searchRef.input.state.value
    if (phrase) {
      handleSearch(dataIndex, phrase)
    }
  }
  const resetSearch = () => {
    searchRef.input.state.value = ''
    getData()
  }
  return (
    <div className="search-container">
      <div className="search-input-container">
        <Input.Search
          placeholder={`Input search ${dataIndex}`}
          onSearch={onSearch}
          ref={setSearch()}
        />
      </div>
      <div>
        <Button
          type="primary"
          onClick={handleSearchOnClick}
          icon="search"
          size="small"
          className="search-input-confirm-btn"
        >
          Search
        </Button>
        <Button
          onClick={resetSearch}
          size="small"
          className="search-input-reset-btn"
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default Search

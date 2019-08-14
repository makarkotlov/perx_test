import React, { useState } from 'react'
import { Button, Input } from 'antd'

const Search = ({ handleSearch, getData, dataIndex }) => {
  const [searchRef, setSearchRef] = useState({})
  return (
    <div className="search-container">
      <div className="search-input-container">
        <Input.Search
          placeholder={`Input search ${dataIndex}`}
          onSearch={phrase => {
            if (phrase) handleSearch(dataIndex, phrase)
          }}
          ref={c => setSearchRef(c)}
        />
      </div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            const phrase = searchRef.input.state.value
            if (phrase) handleSearch(dataIndex, phrase)
          }}
          icon="search"
          size="small"
          className="search-input-confirm-btn"
        >
          Search
        </Button>
        <Button
          onClick={() => {
            searchRef.input.state.value = ''
            getData()
          }}
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

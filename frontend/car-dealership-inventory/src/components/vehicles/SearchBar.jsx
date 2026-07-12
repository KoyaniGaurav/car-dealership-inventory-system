import Button from '../common/Button'

function SearchBar({ value, onChange, onSearch, placeholder = 'Search by make...' }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="text"
        className="search-bar__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search vehicles"
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
      <Button size="small" onClick={onSearch}>
        Search
      </Button>
    </div>
  )
}

export default SearchBar

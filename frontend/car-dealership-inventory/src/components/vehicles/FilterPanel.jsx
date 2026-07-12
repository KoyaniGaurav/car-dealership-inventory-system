import { CATEGORIES, CATEGORY_LABELS } from '../../utils/constants'
import Button from '../common/Button'
import Input from '../common/Input'

function FilterPanel({ filters, onChange, onApply, onReset }) {
  return (
    <div className="filter-panel">
      <div className="filter-panel__header">
        <h3 className="filter-panel__title">Filters</h3>
        <button type="button" className="filter-panel__reset" onClick={onReset}>
          Clear all
        </button>
      </div>

      <div className="filter-panel__grid">
        <Input
          label="Make"
          name="make"
          value={filters.make}
          placeholder="e.g. Toyota"
          onChange={(event) => onChange('make', event.target.value)}
        />
        <Input
          label="Model"
          name="model"
          value={filters.model}
          placeholder="e.g. RAV4"
          onChange={(event) => onChange('model', event.target.value)}
        />
        <div className="form-field">
          <label className="form-field__label" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="form-field__select"
            value={filters.category}
            onChange={(event) => onChange('category', event.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {CATEGORY_LABELS[category]}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Min Price (₹)"
          name="minPrice"
          type="number"
          value={filters.minPrice}
          placeholder="0"
          onChange={(event) => onChange('minPrice', event.target.value)}
        />
        <Input
          label="Max Price (₹)"
          name="maxPrice"
          type="number"
          value={filters.maxPrice}
          placeholder="1000000"
          onChange={(event) => onChange('maxPrice', event.target.value)}
        />
      </div>

      <div className="filter-panel__actions">
        <Button onClick={onApply}>Apply Filters</Button>
      </div>
    </div>
  )
}

export default FilterPanel

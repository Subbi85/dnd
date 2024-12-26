import React from 'react'

const ItemFilter = () => {
  return (
      <div className="filters">
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name filtern"
            value={filterName}
            onChange={(e) => handleFilterChange(e, "name")}
          />
        </div>
        <div>
          <label>Seltenheit:</label>
          <select
            value={filterRarity}
            onChange={(e) => handleFilterChange(e, "rarity")}
          >
            <option value="">Alle</option>
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="legendary">Legendary</option>
          </select>
        </div>
        <div>
          <label>Maximaler Preis (Gold):</label>
          <input
            type="number"
            placeholder="Maximaler Preis"
            value={filterPrice}
            onChange={(e) => handleFilterChange(e, "price")}
          />
        </div>
        <button onClick={resetFilters}>Filter zurücksetzen</button>
      </div>
  )
}

export default ItemFilter
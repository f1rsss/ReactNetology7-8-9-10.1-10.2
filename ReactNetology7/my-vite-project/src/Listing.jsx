import React from 'react';
import './App.css';

function formatPrice(price, currencyCode) {
  if (currencyCode === 'USD') return `$${price}`;
  if (currencyCode === 'EUR') return `€${price}`;
  if (currencyCode === 'GBP') return `£${price}`;
  return `${currencyCode} ${price}`;
}

function getStockClass(quantity) {
  if (quantity <= 10) return 'stock-low';
  if (quantity <= 20) return 'stock-medium';
  return 'stock-high';
}

function truncateTitle(title) {
  return title.length > 50 ? `${title.slice(0, 50)}…` : title;
}

function Listing({ items = [] }) {
  return (
    <div className="container">
      <div className="product-grid">
        {items.map((item) => (
          <div className="product-card" key={item.listing_id}>
            <img
              src={item.MainImage.url_570xN}
              alt={item.title}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">{truncateTitle(item.title)}</h3>
              <div className="price-container">
                <div className="product-price">
                  {formatPrice(item.price, item.currency_code)}
                </div>
                <span className={`stock-badge ${getStockClass(item.quantity)}`}>
                  {item.quantity} left
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listing;

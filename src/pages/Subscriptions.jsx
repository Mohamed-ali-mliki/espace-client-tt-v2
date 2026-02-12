import React, { useState } from "react";
import "../components/Subscriptions.css";

const products = [
  { id: 1, name: "Internet 4GB", price: "dt10", img: "https://img.icons8.com/ios/100/000000/wifi.png" },
  { id: 2, name: "Internet 25GB", price: "dt30", img: "https://img.icons8.com/ios/100/000000/wifi.png" },
  { id: 3, name: "Mobile Basic", price: "dt5", img: "https://img.icons8.com/ios/100/000000/smartphone.png" },
  { id: 4, name: "Mobile Premium", price: "dt12", img: "https://img.icons8.com/ios/100/000000/smartphone.png" },
];

const Subscription = () => {
  const [selected, setSelected] = useState([]);

  const addProduct = (product) => {
    if (!selected.find(p => p.id === product.id)) {
      setSelected([...selected, product]);
    }
  };

  const removeProduct = (id) => {
    setSelected(selected.filter(p => p.id !== id));
  };

  return (
    <div className="subscription-container">
      <h2>Choose Your Subscription</h2>

      <div className="products-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button className="btn-select" onClick={() => addProduct(product)}>Select</button>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="selected-products">
          <h3>Selected Products</h3>
          <ul>
            {selected.map(product => (
              <li key={product.id}>
                {product.name} - {product.price} 
                <button className="remove-btn" onClick={() => removeProduct(product.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Subscription;

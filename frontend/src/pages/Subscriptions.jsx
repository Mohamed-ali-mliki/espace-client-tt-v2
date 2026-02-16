import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/Subscriptions.css";

const Subscription = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [confirmed, setConfirmed] = useState([]);
  const [loading, setLoading] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Chargement des produits...");
        const res = await axios.get("http://localhost:5000/api/subscriptions");
        console.log("Produits reçus:", res.data);
        setProducts(res.data);
      } catch (error) {
        console.error("Erreur chargement produits:", error);
        alert("Impossible de charger les offres. Vérifiez que le serveur est démarré.");
      }
    };
    fetchProducts();
  }, []);

  const addProduct = (product) => {
    if (!selected.find(p => p._id === product._id)) {
      setSelected([...selected, product]);
    }
  };

  const removeProduct = (id) => {
    setSelected(selected.filter(p => p._id !== id));
  };

  const handleConfirm = async () => {
    if (!userInfo || !userInfo._id) {
      alert("Veuillez vous connecter d'abord");
      return;
    }
    setLoading(true);
    try {
      const promises = selected.map(product =>
        axios.post("http://localhost:5000/api/subscriptions/subscribe",
          { userId: userInfo._id, subscriptionId: product._id },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      );
      await Promise.all(promises);
      setConfirmed([...confirmed, ...selected]);
      setSelected([]);
      alert("Inscription réussie !");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscription-container">
      <h2>Choisissez votre abonnement</h2>
      <div className="products-grid">
        {products.length === 0 ? (
          <p>Aucune offre disponible pour le moment.</p>
        ) : (
          products.map(product => (
            <div className="product-card" key={product._id}>
              <img src={product.img || "https://img.icons8.com/ios/100/000000/wifi.png"} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button className="btn-select" onClick={() => addProduct(product)}>Sélectionner</button>
            </div>
          ))
        )}
      </div>

      {selected.length > 0 && (
        <div className="selected-products">
          <h3>Produits sélectionnés</h3>
          <ul>
            {selected.map(product => (
              <li key={product._id}>
                {product.name} - {product.price}
                <button className="remove-btn" onClick={() => removeProduct(product._id)}>Retirer</button>
              </li>
            ))}
          </ul>
          <button className="btn-confirm" onClick={handleConfirm} disabled={loading}>
            {loading ? "En cours..." : "Accepter"}
          </button>
        </div>
      )}

      {confirmed.length > 0 && (
        <div className="confirmed-products">
          <h3>Abonnements confirmés</h3>
          <ul>
            {confirmed.map(product => (
              <li key={product._id} className="confirmed-item">
                {product.name} - {product.price}
                <span className="success-badge">✔ Inscrit</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Subscription;
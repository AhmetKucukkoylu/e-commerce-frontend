import React from "react";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard/ProductCard";
import "./WishlistPage.css";

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="wishlist-page-root">
      <div className="wishlist-page-main">
        <h2 className="wishlist-title">Favorilerim</h2>
        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <p>Henüz favori ürününüz bulunmamaktadır.</p>
            <p>Ürünleri favorilere eklemek için kalp simgesine tıklayın.</p>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;

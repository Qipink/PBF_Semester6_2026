import { useEffect, useState } from 'react';
import styles from './product.module.css';

type ProductType = 
{
  id: string;
  name: string;
  price: number;
  size: string;
  category: string;
}

const kategori = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = () => {
    setIsLoading(true);
    fetch("/api/produk")
      .then((response) => response.json())
      .then((responsedata) => {
        setProducts(responsedata.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      })
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Daftar Produk</h1>
      <button 
        onClick={fetchProducts}
        disabled={isLoading}
        className={styles.buttonRefresh}
      >
        {isLoading ? 'Memproses...' : 'Refresh Data'}
      </button>
      {products.map((product:ProductType) => (
        <div key={product.id} className={styles.productItem}>
          <h2 className={styles.productName}>{product.name}</h2>
          <p className={styles.productInfo}>Harga: {product.price}</p>
          <p className={styles.productInfo}>Ukuran: {product.size}</p>
          <p className={styles.productInfo}>Kategori: {product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default kategori;
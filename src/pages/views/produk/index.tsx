import HeroSection from "./hero";
import MainSection from "./main";
import styles from "../../product/product.module.scss";


type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>Daftar Produk</h1>
      <div className={styles.product__content}>
        {products.length > 0 ? (
          <>
            {products.map((products: ProductType) => (
              <div key={products.id} className={styles.product__content__item}>
                <img src={products.image} alt={products.name} className={styles.product__content__item__image}/>
                <p className={styles.product__content__item__category}>Kategori: {products.category}</p>
                <h2 className={styles.product__content__item__name}>Nama: {products.name}</h2>
                <p className={styles.product__content__item__price}>Harga: Rp. {products.price}</p>
              </div>
            ))}
          </>
        ) : (
          <div className={styles.product__content__skeleton}>
            <div className={styles.product__content__skeleton__image}></div>
            <div className={styles.product__content__skeleton__category}></div>
            <div className={styles.product__content__skeleton__name}></div>
            <div className={styles.product__content__skeleton__price}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TampilanProduk;
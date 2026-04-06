import HeroSection from "./hero";
import MainSection from "./main";
import styles from "@/pages/product/product.module.scss";
import Link from "next/link";

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
              <Link href={`/product/${products.id}`} key={products.id} className={styles.product__content__item}>
                <img className={styles.product__content__item__image} src={products.image} alt={products.name} />
                <h4 className={styles.product__content__item__name}>
                  {products.name}
                </h4>
                <p className={styles.product__content__item__category}>
                  {products.category}
                </p>
                <p className={styles.product__content__item__price}>
                  Rp {products.price.toLocaleString("id-ID")}
                </p>
              </Link>
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
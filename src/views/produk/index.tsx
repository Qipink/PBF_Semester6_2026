import HeroSection from "./hero";
import MainSection from "./main";
import styles from "@/pages/product/product.module.scss";
import Link from "next/link";
import Image from "next/image";

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
      <h1 className={styles.product__title} data-testid="title">Daftar Produk</h1>
      <div className={styles.product__content}>
        {products.length > 0 ? (
          <>
            {products.map((products: ProductType) => (
              <Link href={`/product/${products.id}`} key={products.id} className={styles.product__content__item}>
                <div className={styles.product__content__item__image}>
                <Image src={products.image} alt={products.name} height={200} width={200}/>
                </div>
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
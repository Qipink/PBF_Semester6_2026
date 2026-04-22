import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
    return (
        <>
            <head>
                <title>404 - Not Found</title>
            </head>
            <div className={styles.error}>
                <Image
                    src="/page-not-found.svg"
                    alt="404"
                    width={400}
                    height={200}
                    className={styles.error_image}
                />

                <h1 className={styles.error_title}>
                    404 - Halaman Tidak Ditemukan
                </h1>

                <p className={styles.error_desc}>
                    Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
                </p>

                <Link href="/" className={styles.error_button}>
                    Kembali ke Home
                </Link>
            </div>
        </>
    );
};

export default Custom404;
import Link from "next/link";
import styles from "./register.module.scss";

const TampilanRegister = () => {
    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Halaman Register</h1>
            <div className={styles.register__form}>
                <form action="">
                    <div className={styles.register__form__item}>
                        <label htmlFor="email" className={styles.register__form__item__label}>
                            Email
                        </label>
                        <input type="email" id="email" name="email" placeholder="Email" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="Fullname" className={styles.register__form__item__label}>
                            Fullname
                        </label>
                        <input type="text" id="Fullname" name="Fullname" placeholder="Fullname" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="Fullname" className={styles.register__form__item__label}>
                            Password
                        </label>
                        <input type="password" id="Password" name="Password" placeholder="Password" className={styles.register__form__item__input} />
                    </div>
                    <button type="submit" className={styles.register__form__item__button}>
                        Register
                    </button>
                </form>
                <br />
                <p className={styles.register__form__item__text}>
                    Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
                </p>
            </div>
        </div>
    )
}

export default TampilanRegister;
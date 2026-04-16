import Link from "next/link";
import styles from "./register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const fullname = formData.get("Fullname") as string;
        const password = formData.get("Password") as string;
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                fullname,
                password,
            }),
        });

        if (response.status === 200) {
            form.reset();
            setIsLoading(false);
            push("/auth/login");
        } else {
            setIsLoading(false);
            setError(response.status === 400 ? "User already exists" : "An error occurred.");
        }
    }

    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Halaman Register</h1>
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
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
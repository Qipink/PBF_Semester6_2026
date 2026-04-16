import Link from "next/link";
import styles from "./register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setError("");
        setIsLoading(true);
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);
        const email = (formData.get("email") as string)?.trim();
        const fullname = formData.get("Fullname") as string;
        const password = formData.get("Password") as string;

        if (!email) {
            setIsLoading(false);
            setError("Email wajib diisi");
            return;
        }

        if (!password || password.length < 6) {
            setIsLoading(false);
            setError("Password minimal 6 karakter");
            return;
        }

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

        const result = await response.json();

        if (response.status === 200) {
            form.reset();
            setIsLoading(false);
            push("/auth/login");
        } else {
            setIsLoading(false);
            setError(result.name || "An error occurred.");
        }
    }

    return (
        <div className={styles.register}>
            {error && <p className={styles.register__error}>{error}</p>}
            <h1 className={styles.register__title}>Halaman Register</h1>
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.register__form__item}>
                        <label htmlFor="email" className={styles.register__form__item__label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className={styles.register__form__item__input}
                            required
                        />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="Fullname" className={styles.register__form__item__label}>
                            Fullname
                        </label>
                        <input
                            type="text"
                            id="Fullname"
                            name="Fullname"
                            placeholder="Fullname"
                            className={styles.register__form__item__input}
                        />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="Fullname" className={styles.register__form__item__label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="Password"
                            name="Password"
                            placeholder="Password"
                            className={styles.register__form__item__input}
                            minLength={6}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.register__form__item__button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Register"}
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
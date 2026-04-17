import Link from "next/link";
import styles from "./login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Tampilanlogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push, query } = useRouter();
    const callbackUrl: any = query.callbackUrl || "/";
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        // const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);
        const email = (formData.get("email") as string)?.trim();
        const password = formData.get("password") as string;

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

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const result = await response.json();

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
                callbackUrl,
            });

            if (!res?.error) {
                setIsLoading(false);
                push(callbackUrl);
            } else {
                setIsLoading(false);
                if (res.error === "CredentialsSignin") {
                    setError("Email atau Password Salah");
                } else {
                    setError(res.error || "Login Failed");
                }
            }
        } catch (error) {
            setIsLoading(false);
            setError("Wrong email or password");
        }
    }

    return (
        <>
            <div className={styles.login}>
                {error && <p className={styles.login__error}>{error}</p>}
                <h1 className={styles.login__title}>Halaman login</h1>
                <div className={styles.login__form}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.login__form__item}>
                            <label htmlFor="email" className={styles.login__form__item__label}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                className={styles.login__form__item__input}
                                required
                            />
                        </div>
                        <div className={styles.login__form__item}>
                            <label htmlFor="password" className={styles.login__form__item__label}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                className={styles.login__form__item__input}
                                minLength={6}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={styles.login__form__item__button}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "login"}
                        </button>
                    </form>
                    <br />
                    <p className={styles.login__form__item__text}>
                        Belum punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Tampilanlogin;
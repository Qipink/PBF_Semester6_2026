import Link from "next/link"

export default function About() {
    return (
    <>
        <div>
            <h1>Nama            : Muhammad Rifqi Rizqullah</h1> <br />
            <h2>NIM             : 2341720091</h2> <br />
            <h3>Program Studi   : D4 - Teknik Informatika</h3> <br />
        </div>
        <Link href="/" className="home">Kembali</Link>
    </>
    )
}
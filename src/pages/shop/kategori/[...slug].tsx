import { useRouter } from "next/router";

const halamanKategori = () => {
    const Router = useRouter();
    console.log(Router);
    const { query } = Router;

    return (
        <div>
            <h1>Halaman Kategori</h1>
            <ul>
                Kategori : <br />
                {Array.isArray(query.slug) ? query.slug.map((item: string, index: number) => (
                    <li  key={index}>{item}</li>
                )) : "Semua Kategori"}
            </ul>
        </div>
    )
}

export default halamanKategori;
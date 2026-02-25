import {useRouter} from 'next/router'

const HalamanBlog = () => {
    const {query} = useRouter();
    return (
        <div>
            <h1>Ini adalah halaman blog dengan slug: {query.slug}</h1>
        </div>
    )
}

export default HalamanBlog;
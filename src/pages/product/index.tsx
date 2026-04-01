import TampilanProduk from '../views/produk';
import ProductSkeleton from '@/components/skeleton/ProductSkeleton';
import useSWR from 'swr';
import fetcher from '../utils/swr/fetcher';

const kategori = () => {
  const { data, error, isLoading } = useSWR('/api/produk', fetcher);

  return (
    <div>
      {isLoading ? (
        <ProductSkeleton count={6} />
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Error memuat produk</p>
        </div>
      ) : (
        <TampilanProduk products={data?.data || []} />
      )}
    </div>
  )
}
export default kategori;
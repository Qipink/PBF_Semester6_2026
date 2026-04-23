import { render, screen } from '@testing-library/react';
import TampilanProduk from '../../pages/product';
import useSWR from 'swr'; // Import useSWR untuk di-mock

// 1. Mocking useSWR
jest.mock('swr');
const mockedUseSWR = useSWR as jest.Mock;

// 2. Mocking next/router (sudah benar)
jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/product",
            pathname: "",
            query: {},
            asPath: "",
            push: jest.fn(),
            events: { // Perbaikan typo: biasanya 'events' bukan 'event'
                on: jest.fn(),
                off: jest.fn(),
            },
            isReady: true,
        }
    }
}))

describe("Product Page", () => {
    it("renders product page correctly", () => {
        // 3. Berikan data palsu ke SWR agar data.data tidak undefined
        mockedUseSWR.mockReturnValue({
            data: {
                data: [
                    { id: 1, name: 'Produk A', price: 1000 },
                ]
            },
            isLoading: false,
            error: undefined
        });

        const page = render(<TampilanProduk/>)
        
        expect(screen.getByTestId("title").textContent).toBe("Daftar Produk")
        expect(page).toMatchSnapshot()
    })
})
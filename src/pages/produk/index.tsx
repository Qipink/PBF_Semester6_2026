import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProdukView from "../views/produk";

const ProdukPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, []);

  return <ProdukView />;


};

export default ProdukPage;
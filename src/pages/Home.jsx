import Product from "../components/Product";
import { useState } from "react";

function Home() {
   const [products, setProducts] = useState([]);

   const getProductInfo = async () => {
      setInterval(() => {
         fetch("http://localhost:8081/api/produto")
            .then((response) => {
               if (!response.ok) {
                  throw new Error("Erro inesperado");
               }
               return response.json();
            })
            .then((data) => {
               console.log("Sucesso: ", data);
               setProducts((prevProducts) => {
                  const exists = prevProducts.some(
                     (product) => product.id === data.id
                  );

                  if (exists) {
                     return prevProducts;
                  }

                  return [
                     ...prevProducts,
                     {
                        id: data.id,
                        nome: data.nome,
                        valor: data.valor,
                        descricao: data.descricao,
                        imagem: data.imagem,
                        sku: data.sku,
                     },
                  ];
               });
            })
            .catch((error) => {
               console.log(error);
            });
      }, 2000);
   };

   return (
      <>
         <Product products={products} />
      </>
   );
}

export default Home;

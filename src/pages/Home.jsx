import Product from "../components/Product";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";
import AdicionarProduto from "../components/AdicionarProduto";

function Home() {
   const [searchParams] = useSearchParams();
   const [products, setProducts] = useState([]);
   const idCliente = searchParams.get("idcliente");
   const [cliente, setCliente] = useState([]);
   const [isAdicionarProdutoVisible, setIsAdicionarProdutoVisible] =
      useState(false);

   useEffect(() => {
      setTimeout(() => {
         fetch("http://localhost:8081/api/produto")
            .then((response) => {
               if (!response.ok) {
                  throw new Error("Erro ao buscar os produtos");
               }
               return response.json();
            })
            .then((data) => {
               console.log("Dados da API:", data);
               setProducts(data);
            })
            .catch((error) => {
               console.error("Erro:", error);
            });
      }, 2000);
   });

   useEffect(() => {
      if (!idCliente) return;

      fetch(`http://localhost:8081/api/login/id/${idCliente}`, {
         method: "GET",
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Erro inesperado: " + response);
            }
            return response.json();
         })
         .then((data) => {
            console.log(`Busca bem-sucedida:`, data);
            setCliente(data);
         })
         .catch((error) => {
            console.error("Erro:", error);
         });
   }, [idCliente]);

   const toggleAdicionarProduto = () => {
      setIsAdicionarProdutoVisible((prev) => !prev);
   };

   return (
      <>
         <header>
            {cliente && cliente.admin ? (
               <div className="flex flex-row justify-around">
                  <button onClick={toggleAdicionarProduto} className="w-52">
                     {isAdicionarProdutoVisible
                        ? "Fechar"
                        : "Adicionar produto"}
                  </button>
                  <HeaderHome />
                  <button className="w-52">Gerenciar usuários</button>
               </div>
            ) : (
               <HeaderHome />
            )}
         </header>
         <Product products={products} />
         {isAdicionarProdutoVisible && <AdicionarProduto />}
      </>
   );
}

export default Home;

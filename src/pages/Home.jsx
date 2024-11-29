import Product from "../components/Product";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Home() {
   const [searchParams] = useSearchParams();
   const [products, setProducts] = useState([]);
   const idCliente = parseInt(searchParams.get("idcliente"), 10);
   const [cliente, setCliente] = useState([]);

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

   return (
      <>
         <header>
            {cliente && cliente.admin ? (
               <div>é admin</div>
            ) : (
               <div>não é admin</div>
            )}
         </header>
         <Product products={products} />
      </>
   );
}

export default Home;

import Product from "../components/Product";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";
import AdicionarProduto from "../components/AdicionarProduto";
import GerenciarUsuarios from "../components/GerenciarUsuarios";
import { CircleX, LogOut, PackagePlus, Search, UserCog } from "lucide-react";

function Home() {
   const navigate = useNavigate();

   const [searchParams] = useSearchParams();
   const [products, setProducts] = useState([]);
   const idCliente = searchParams.get("idcliente");
   const [cliente, setCliente] = useState([]);
   const [isAdicionarProdutoVisible, setIsAdicionarProdutoVisible] =
      useState(false);
   const [isGerenciarUsuarioVisible, setIsGerenciarUsuarioVisible] =
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
      if (isGerenciarUsuarioVisible) {
         setIsAdicionarProdutoVisible((prev) => !prev);
         setIsGerenciarUsuarioVisible((prev) => !prev);
      } else {
         setIsAdicionarProdutoVisible((prev) => !prev);
      }
   };

   const toggleGerenciarUsuarios = () => {
      if (isAdicionarProdutoVisible) {
         setIsAdicionarProdutoVisible((prev) => !prev);
         setIsGerenciarUsuarioVisible((prev) => !prev);
      } else {
         setIsGerenciarUsuarioVisible((prev) => !prev);
      }
   };

   return (
      <>
         <header>
            {cliente && cliente.admin ? (
               <div className="flex flex-row justify-around mx-6">
                  <div className="flex flex-row">
                     <button
                        onClick={() => navigate(-1)}
                        className="w-16 flex justify-center items-center"
                     >
                        <LogOut />
                     </button>
                     <button
                        onClick={toggleAdicionarProduto}
                        className="w-16 ml-6 flex justify-center items-center"
                     >
                        {isAdicionarProdutoVisible ? (
                           <CircleX />
                        ) : (
                           <PackagePlus />
                        )}
                     </button>
                  </div>
                  <HeaderHome />
                  <div className="flex flex-row">
                     <button
                        onClick={toggleGerenciarUsuarios}
                        className="w-16 flex items-center justify-center mr-6"
                     >
                        {isGerenciarUsuarioVisible ? <CircleX /> : <UserCog />}
                     </button>
                     <button className="w-16 flex items-center justify-center">
                        <Search />
                     </button>
                  </div>
               </div>
            ) : (
               <div className="flex flex-row justify-around mx-6">
                  <button
                     onClick={() => navigate(-1)}
                     className="w-16 flex justify-center items-center"
                  >
                     <LogOut />
                  </button>
                  <HeaderHome />
                  <button className="w-16 flex items-center justify-center">
                     <Search />
                  </button>
               </div>
            )}
         </header>
         <Product products={products} />
         {isAdicionarProdutoVisible && <AdicionarProduto />}
         {isGerenciarUsuarioVisible && (
            <GerenciarUsuarios idCliente={idCliente} />
         )}
      </>
   );
}

export default Home;

import Product from "../components/Product";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";
import AdicionarProduto from "../components/AdicionarProduto";
import GerenciarUsuarios from "../components/GerenciarUsuarios";
import { CircleX, LogOut, PackagePlus, Search, UserCog } from "lucide-react";
import Footer from "../components/Footer";

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

   const deleteProduct = (sku) => {
      fetch(`http://localhost:8081/api/produto/${sku}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Erro inesperado");
            }
            return response;
         })
         .then((data) => {
            console.log("Produto deletado com sucesso: ", data);
            setProducts((prevProducts) =>
               prevProducts.filter((product) => product.sku !== sku)
            );
         })
         .catch((error) => {
            console.log("Erro: " + error);
         });
   };

   return (
      <>
         <div className="flex flex-col gap-16">
            <header className="bg-gray-400 py-4">
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
                           {isGerenciarUsuarioVisible ? (
                              <CircleX />
                           ) : (
                              <UserCog />
                           )}
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
            <div className="w-full flex justify-center items-center">
               <div className="grid grid-cols-3 max-w-[60rem] p-8 bg-gray-700 rounded-xl gap-4">
                  <Product
                     products={products}
                     cliente={cliente}
                     deleteProduct={deleteProduct}
                  />
               </div>
            </div>
            <Footer />
         </div>
         {isAdicionarProdutoVisible && <AdicionarProduto />}
         {isGerenciarUsuarioVisible && (
            <GerenciarUsuarios idCliente={idCliente} />
         )}
      </>
   );
}

export default Home;

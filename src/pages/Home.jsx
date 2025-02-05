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
         <header className="flex flex-col">
            <div className="bg-black min-h-8 min-w-full flex items-center justify-center">
               <p className="text-white text-center">
                  PRODUTOS DISPONIVEIS POR TEMPO ILIMITADO
               </p>
            </div>
            <div className="bg-cyan-800 min-h-12">
               {cliente && cliente.admin ? (
                  <div className="flex flex-row justify-around mx-6">
                     <div className="flex flex-row">
                        <button
                           onClick={() => navigate(-1)}
                           className="w-16 flex justify-center items-center"
                        >
                           <LogOut className="text-white" id="logout" />
                        </button>
                        <button
                           onClick={toggleAdicionarProduto}
                           className="w-16 ml-6 flex justify-center items-center"
                        >
                           {isAdicionarProdutoVisible ? (
                              <CircleX className="text-white" />
                           ) : (
                              <PackagePlus
                                 className="text-white"
                                 id="createProduct"
                              />
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
                              <CircleX className="text-white" />
                           ) : (
                              <UserCog
                                 className="text-white"
                                 id="configUsers"
                              />
                           )}
                        </button>
                        <button className="w-16 flex items-center justify-center">
                           <Search className="text-white" id="search" />
                        </button>
                     </div>
                  </div>
               ) : (
                  <div className="flex flex-row justify-around mx-6">
                     <button
                        onClick={() => navigate(-1)}
                        className="w-16 flex justify-center items-center"
                     >
                        <LogOut className="text-white" id="logout" />
                     </button>
                     <HeaderHome className="text-white" />
                     <button className="w-16 flex items-center justify-center">
                        <Search className="text-white" id="search" />
                     </button>
                  </div>
               )}
            </div>
         </header>

         <div className="flex flex-col bg-gray-200 min-h-[72.6vh]">
            <div className="m-16 flex justify-center items-center">
               <div className="grid grid-cols-3 flex-wrap w-[60rem] p-8 bg-white rounded-xl gap-4">
                  <Product
                     products={products}
                     cliente={cliente}
                     deleteProduct={deleteProduct}
                  />
               </div>
            </div>
         </div>
         <footer className="bg-cyan-800 h-[5rem] flex justify-center items-center">
            <div className="mx-5 flex text-center">
               <p className="text-white">
                  Direitos reservados ao grupo{" "}
                  <span className="font-bold">João Paulo, Gustavo e Caio</span>{" "}
                  © 2024
               </p>
            </div>
         </footer>
         {isAdicionarProdutoVisible && <AdicionarProduto />}
         {isGerenciarUsuarioVisible && (
            <GerenciarUsuarios idCliente={idCliente} />
         )}
      </>
   );
}

export default Home;

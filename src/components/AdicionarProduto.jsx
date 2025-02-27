import { v4 } from "uuid";
import { useState } from "react";

function AdicionarProduto() {
   const [nomeProd, setNomeProd] = useState("");
   const [valorProd, setValorProd] = useState();
   const [descricaoProd, setDescricaoProd] = useState("");
   const [imagePath, setImagePath] = useState("");

   const createProduct = (e) => {
      e.preventDefault();

      if (
         nomeProd.trim() === "" ||
         valorProd?.toString().trim() === "" ||
         descricaoProd.trim() === "" ||
         imagePath.trim() === ""
      ) {
         alert("Todas as informações devem ser preenchidas");
         return;
      }

      fetch("http://localhost:8088/api/produto", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            id: v4(),
            nome: nomeProd,
            valor: valorProd,
            descricao: descricaoProd,
            imagem: imagePath,
            sku: v4(),
         }),
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Erro inesperado");
            }
            return response.json();
         })
         .then(() => {
            setNomeProd("");
            setValorProd("");
            setDescricaoProd("");
            setImagePath("");
         })
         .catch((error) => {
            console.error(error);
         });
   };

   return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 w-full max-w-[35rem] h-auto md:h-[30rem] flex flex-col justify-between rounded-lg shadow-lg">
         <div className="flex w-full justify-center mb-4">
            <p className="text-lg font-semibold">Adicionar produto</p>
         </div>
         <form
            action="createProduct"
            className="flex flex-col justify-center items-center space-y-4 w-full"
         >
            <div className="flex flex-col w-full">
               <label htmlFor="name" className="text-sm font-medium">
                  Título do produto
               </label>
               <input
                  type="text"
                  placeholder="Digite o título aqui"
                  value={nomeProd}
                  onChange={(e) => setNomeProd(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
               />
            </div>
            <div className="flex flex-col w-full">
               <label htmlFor="value" className="text-sm font-medium">
                  Valor do produto
               </label>
               <input
                  type="number"
                  placeholder="Digite o valor aqui"
                  value={valorProd}
                  onChange={(e) => setValorProd(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
               />
            </div>
            <div className="flex flex-col w-full ">
               <label htmlFor="description" className="text-sm font-medium">
                  Descrição do produto
               </label>
               <input
                  type="text"
                  placeholder="Digite a descrição aqui"
                  value={descricaoProd}
                  onChange={(e) => setDescricaoProd(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
               />
            </div>
            <div className="flex flex-col w-full">
               <label htmlFor="image" className="text-sm font-medium">
                  Caminho da imagem na web
               </label>
               <input
                  type="text"
                  placeholder="Digite aqui o caminho da imagem"
                  value={imagePath}
                  onChange={(e) => setImagePath(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
               />
            </div>
         </form>
         <button
            onClick={createProduct}
            className="mt-4 py-2 px-6 bg-cyan-800 hover:bg-cyan-600 text-white rounded-md transition"
         >
            Criar produto
         </button>
      </div>
   );
}

export default AdicionarProduto;

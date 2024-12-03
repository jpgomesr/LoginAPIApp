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

      fetch("http://localhost:8081/api/produto", {
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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 p-4 w-[35rem] h-[30rem] flex flex-col justify-between">
         <div className="flex w-full justify-center">
            <p>Adicionar produto</p>
         </div>
         <form
            action="createProduct"
            className="flex flex-col justify-center items-center space-y-4"
         >
            <div className="flex flex-col w-full">
               <label htmlFor="name">Titulo do produto</label>
               <input
                  type="text"
                  placeholder="Digite o titulo aqui"
                  value={nomeProd}
                  onChange={(e) => setNomeProd(e.target.value)}
               />
            </div>
            <div className="flex flex-col w-full">
               <label htmlFor="value">Valor do produto</label>
               <input
                  type="number"
                  placeholder="Digite o valor aqui"
                  value={valorProd}
                  onChange={(e) => setValorProd(e.target.value)}
               />
            </div>
            <div className="flex flex-col w-full">
               <label htmlFor="description">Descrição do produto</label>
               <input
                  type="text"
                  placeholder="Digite a descrição aqui"
                  value={descricaoProd}
                  onChange={(e) => setDescricaoProd(e.target.value)}
               />
            </div>
            <div className="flex flex-col w-full">
               <label htmlFor="image">Caminho da imagem na web</label>
               <input
                  type="text"
                  placeholder="Digite aqui o caminho da imagem"
                  value={imagePath}
                  onChange={(e) => setImagePath(e.target.value)}
               />
            </div>
         </form>
         <button onClick={createProduct}>Criar produto</button>
      </div>
   );
}

export default AdicionarProduto;

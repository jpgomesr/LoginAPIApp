import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function Product({ products, cliente, deleteProduct }) {
   const [loadingMessage, setLoadingMessage] = useState(
      "Carregando produtos..."
   );

   useEffect(() => {
      if (products.length == 0) {
         setInterval(() => {
            setLoadingMessage("Nenhum produto encontrado!");
         }, 3000);
      }
   }, [products]);

   return (
      <>
         {products.length === 0 ? (
            <p className="text-center text-gray-500">{loadingMessage}</p>
         ) : (
            products.map((product) => (
               <div
                  key={product.id}
                  className="relative flex flex-col justify-center items-center text-center border p-6 space-y-4 rounded-lg shadow-md bg-white"
               >
                  {cliente && cliente.admin && (
                     <button
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-400 transition"
                        onClick={() => deleteProduct(product.sku)}
                     >
                        <Trash2 />
                     </button>
                  )}
                  <p className="text-lg font-bold text-gray-900">
                     {product.nome}
                  </p>
                  <p className="text-md text-gray-600">R$ {product.valor}</p>
                  <p className="text-sm text-gray-500">{product.descricao}</p>
                  <img
                     className="w-32 h-32 object-cover rounded-lg shadow-sm"
                     src={product.imagem}
                     alt={product.descricao}
                  />
               </div>
            ))
         )}
      </>
   );
}

export default Product;

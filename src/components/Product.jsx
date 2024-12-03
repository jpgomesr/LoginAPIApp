import { Trash2 } from "lucide-react";

function Product({ products, cliente, deleteProduct }) {
   return (
      <>
         {products.length === 0 ? (
            <p>Carregando produtos...</p>
         ) : (
            products.map((product) => (
               <div
                  key={product.id}
                  className="relative flex flex-col justify-center items-center text-center border p-4"
               >
                  {cliente && cliente.admin ? (
                     <button
                        className="absolute top-2 left-2"
                        onClick={() => deleteProduct(product.sku)}
                     >
                        <Trash2 />
                     </button>
                  ) : null}
                  <p>{product.id}</p>
                  <p>{product.nome}</p>
                  <p>{product.valor}</p>
                  <p>{product.descricao}</p>
                  <img
                     className="w-[8rem] h-[8rem]"
                     src={product.imagem}
                     alt={product.descricao}
                  />
                  <p>{product.sku}</p>
               </div>
            ))
         )}
      </>
   );
}

export default Product;

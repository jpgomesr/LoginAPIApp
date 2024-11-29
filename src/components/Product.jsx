function Product({ products }) {
   return (
      <>
         {products.map((product) => (
            <div key={product.id}>
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
         ))}
      </>
   );
}

export default Product;

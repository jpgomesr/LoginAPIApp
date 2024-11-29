function Product({ products }) {
   return (
      <>
         {products.map((product) => (
            <div key={product.id}>
               <p>{product.id}</p>
               <p>{product.nome}</p>
               <p>{product.valor}</p>
               <p>{product.descricao}</p>
               <p>{product.imagem}</p>
               <p>{product.sku}</p>
            </div>
         ))}
      </>
   );
}

export default Product;

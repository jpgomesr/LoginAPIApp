import { v4 } from "uuid";
import { useState } from "react";

function AdicionarProduto() {
   const [nomeProd, setNomeProd] = useState("");
   const [valorProd, setValorProd] = useState();
   const [descricaoProd, setDescricaoProd] = useState("");
   const [imagePath, setImagePath] = useState("");

   return (
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 p-4 w-[35rem] h-[30rem]">
         <p>teste</p>
      </div>
   );
}

export default AdicionarProduto;

import { useEffect, useState } from "react";

function GerenciarUsuarios({ idCliente }) {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const interval = setInterval(() => {
         fetch("http://localhost:8081/api/users", {
            method: "GET",
         })
            .then((response) => {
               if (!response.ok) {
                  throw new Error("Erro inesperado");
               }
               return response.json();
            })
            .then((data) => {
               setUsers(data);
            })
            .catch((error) => {
               console.error("Erro: " + error);
            });
      }, 300);

      return () => clearInterval(interval);
   }, []);

   const changeAdminPerm = (userId) => {
      fetch(`http://localhost:8081/api/users/${userId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Erro inesperado");
            }
            return response.json();
         })
         .then((data) => {
            console.log("Usuário atualizado com sucesso: " + data);
         })
         .catch((error) => {
            console.error("Erro: " + error);
         });
   };

   return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 w-full max-w-[35rem] h-auto md:h-[30rem] flex flex-col justify-between rounded-lg shadow-lg">
         <div className="w-full">
            {users.length > 0 ? (
               users.map((user) => (
                  <div
                     key={user.id}
                     className="flex flex-row justify-between items-center mb-3 border-b border-gray-200 pb-2"
                  >
                     <div className="flex flex-col flex-1">
                        <p className="font-medium">
                           {user.nome} {user.sobrenome}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                     </div>
                     <div>
                        {user.id === idCliente ? (
                           <p className="text-sm text-blue-500">
                              É você mesmo!
                           </p>
                        ) : user.admin ? (
                           <button
                              onClick={() => changeAdminPerm(user.id)}
                              className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                           >
                              Remover admin
                           </button>
                        ) : (
                           <button
                              onClick={() => changeAdminPerm(user.id)}
                              className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                           >
                              Tornar admin
                           </button>
                        )}
                     </div>
                  </div>
               ))
            ) : (
               <p>Carregando usuários...</p>
            )}
         </div>
      </div>
   );
}

export default GerenciarUsuarios;

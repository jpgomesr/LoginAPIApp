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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 p-4 w-[35rem] h-[30rem] flex flex-col justify-between">
         <div>
            {users.length > 0 ? (
               users.map((user) => (
                  <div key={user.id} className="flex flex-row justify-between">
                     <p>{user.nome}</p>
                     <p>{user.sobrenome}</p>
                     <p>{user.email}</p>
                     {user.id === idCliente ? (
                        <p>é voce mesmo burro</p>
                     ) : user.admin ? (
                        <button onClick={() => changeAdminPerm(user.id)}>
                           Remover admin
                        </button>
                     ) : (
                        <button onClick={() => changeAdminPerm(user.id)}>
                           Tornar admin
                        </button>
                     )}
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

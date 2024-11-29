import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import video from "../assets/Video.mp4";
import React from "react";

function Register() {
   const navigate = useNavigate();

   const [name, setName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
         alert("As senhas precisam ser iguais");
         return;
      }

      fetch("http://localhost:8081/api/cadastro", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            nome: name,
            sobrenome: lastName,
            email: email,
            senha: password,
         }),
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Erro inesperado");
            }
            return response.json();
         })
         .then((data) => {
            console.log("Sucesso: " + data);
            navigate(`/`);
         })
         .catch((error) => {
            console.error("Erro de operação: " + error);
         });
   };

   useEffect(() => {
      const backLogin = document.getElementById("backLogin");

      if (backLogin) {
         backLogin.addEventListener("click", () => {
            navigate(`/`);
         });
      }

      return () => {
         if (backLogin) {
            backLogin.removeEventListener("click", () => {
               navigate(`/`);
            });
         }
      };
   }, [navigate]);

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200 py-6 px-6">
         <div className="flex flex-col sm:flex-row-reverse bg-white w-full max-w-4xl h-[40rem] shadow-lg rounded-lg overflow-hidden">
            <div className="w-full sm:w-1/2 p-8">
               <h1 className="text-3xl font-bold mb-8">Criar Conta</h1>
               <form className="flex flex-col" onSubmit={handleSubmit}>
                  {/* Nome */}
                  <label htmlFor="name" className="text-sm mb-2">
                     Nome
                  </label>
                  <input
                     type="text"
                     id="name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Digite seu nome"
                     className="p-2 border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />

                  {/* Sobrenome */}
                  <label htmlFor="lastName" className="text-sm mb-2">
                     Sobrenome
                  </label>
                  <input
                     type="text"
                     id="lastName"
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     placeholder="Digite seu sobrenome"
                     className="p-2 border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />

                  {/* E-mail */}
                  <label htmlFor="email" className="text-sm mb-2">
                     E-mail
                  </label>
                  <input
                     type="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Digite seu e-mail"
                     className="p-2 border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />

                  {/* Senha */}
                  <label htmlFor="password" className="text-sm mb-2">
                     Senha
                  </label>
                  <input
                     type="password"
                     id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Digite sua senha"
                     className="p-2 border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />

                  {/* Confirmar senha */}
                  <label htmlFor="confirmPassword" className="text-sm mb-2">
                     Confirmar senha
                  </label>
                  <input
                     type="password"
                     id="confirmPassword"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     placeholder="Confirme sua senha"
                     className="p-2 border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />

                  <button
                     type="submit"
                     className="bg-cyan-800 hover:bg-cyan-600 text-white p-2 transition duration-300"
                  >
                     Cadastrar conta
                  </button>

                  <h2 className="mt-4 text-center">
                     Já tem uma conta?{" "}
                     <span className="text-cyan-800 cursor-pointer">
                        <button id="backLogin">Login</button>
                     </span>
                  </h2>
               </form>
            </div>

            <div className="hidden sm:block w-[60%]">
               <video
                  className="w-full h-full object-cover rounded-r-[4rem]"
                  style={{ objectPosition: "-210px" }}
                  src={video}
                  type="video/mp4"
                  autoPlay
                  muted
                  loop
               />
            </div>
         </div>
      </div>
   );
}

export default Register;

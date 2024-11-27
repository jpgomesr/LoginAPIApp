import { useEffect } from "react";
import { useNavigate } from "react-router";

function Login() {
   const navigate = useNavigate();

   useEffect(() => {
      document.getElementById("loginButton").addEventListener("click", (e) => {
         e.preventDefault();

         const email = document.getElementById("email").value;
         const password = document.getElementById("password").value;

         fetch("http://localhost:8081/api/cadastro");

         document.getElementById("email").value = "";
         document.getElementById("password").value = "";

         navigate(`/`);
      });

      document
         .getElementById("createAccount")
         .addEventListener("click", (e) => {
            e.preventDefault();

            navigate(`/register`);
         });
   });

   return (
      <>
         <div className="flex justify-center items-center w-screen h-screen">
            <form action="login" className="flex flex-col">
               <label htmlFor="email">E-mail</label>
               <input type="text" id="email" placeholder="Digite seu e-mail" />
               <label htmlFor="password">Senha</label>
               <input
                  type="password"
                  id="password"
                  placeholder="Digite sua senha"
               />
               <button id="createAccount">Criar conta</button>
               <button id="loginButton">Entrar</button>
            </form>
         </div>
      </>
   );
}

export default Login;

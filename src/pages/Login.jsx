import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Login() {
   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   useEffect(() => {
      const loginButton = document.getElementById("loginButton");

      const handleLogin = (e) => {
         e.preventDefault();

         fetch("http://localhost:8081/api/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               email: email,
               senha: password,
            }),
         })
            .then((response) => {
               if (!response.ok) {
                  throw new Error("Credenciais inválidas");
               }
               return response.json();
            })
            .then((data) => {
               console.log("Login bem-sucedido:" + data);
               navigate("/main_page");
            })
            .catch((error) => {
               console.error("Erro de login:" + error);
               alert("Erro de login: " + error);
            });
      };

      loginButton.addEventListener("click", handleLogin);

      return () => {
         loginButton.removeEventListener("click", handleLogin);
      };
   }, [email, password]);

   useEffect(() => {
      const createAccount = document.getElementById("createAccount");

      createAccount.addEventListener("click", () => {
         navigate(`/register`);
      });
   });

   return (
      <>
         <div className="flex justify-center items-center w-screen h-screen">
            <form action="login" className="flex flex-col">
               <label htmlFor="email">E-mail</label>
               <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Digite seu e-mail"
                  onChange={(e) => setEmail(e.target.value)}
               />
               <label htmlFor="password">Senha</label>
               <input
                  type="password"
                  id="password"
                  value={password}
                  placeholder="Digite sua senha"
                  onChange={(e) => setPassword(e.target.value)}
               />
               <button type="button" id="createAccount">
                  Criar conta
               </button>
               <button type="button" id="loginButton">
                  Entrar
               </button>
            </form>
         </div>
      </>
   );
}

export default Login;

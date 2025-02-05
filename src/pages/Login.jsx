import { useEffect, useState } from "react";
import video from "../assets/Video.mp4";
import { useNavigate } from "react-router-dom";

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
               console.log("Login bem-sucedido:", data);
               fetch(`http://localhost:8081/api/login/email/${email}`, {
                  method: "GET",
                  headers: {
                     "Content-Type": "application/json",
                  },
               })
                  .then((response) => {
                     if (!response.ok) {
                        throw new Error("Erro ao buscar o ID do cliente");
                     }
                     return response.json();
                  })
                  .then((clienteData) => {
                     console.log("ID do cliente:", clienteData.id);
                     navigate(`/home?idcliente=${clienteData.id}`);
                  })
                  .catch((error) => {
                     console.error("Erro ao buscar o ID do cliente:", error);
                  });
            });
      };

      loginButton.addEventListener("click", handleLogin);

      return () => {
         loginButton.removeEventListener("click", handleLogin);
      };
   }, [email, password]);

   useEffect(() => {
      const registerButton = document.getElementById("registerButton");

      const handleNavigateRegister = () => {
         navigate("/register");
      };

      registerButton.addEventListener("click", handleNavigateRegister);

      return () => {
         registerButton.removeEventListener("click", handleNavigateRegister);
      };
   }, []);

   return (
      <div className="flex py-3 px-3 items-center justify-center bg-gray-200 min-h-screen">
         <div className="flex flex-col sm:flex-row bg-white w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
            <div className="w-full sm:w-1/2 p-8">
               <h1 className="text-2xl font-bold my-12">Login</h1>
               <form className="flex flex-col">
                  <label htmlFor="email" className="text-sm mb-2">
                     E-mail
                  </label>
                  <input
                     type="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Digite seu e-mail"
                     className="p-2 border border-gray-300 rounded mb-4"
                  />
                  <label htmlFor="password" className="text-sm mb-2">
                     Senha
                  </label>
                  <input
                     type="password"
                     id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Digite sua senha"
                     className="p-2 border border-gray-300 mb-6"
                  />
                  <button
                     type="submit"
                     className="bg-cyan-800  hover:bg-cyan-600 text-white p-2 transition"
                     id="loginButton"
                  >
                     Entrar
                  </button>
                  <h2 className="mt-4">
                     Não possui conta?{" "}
                     <span className="text-cyan-800 cursor-pointer">
                        <button id="registerButton">Cadastrar!</button>
                     </span>
                  </h2>
               </form>
               <hr className="border-t-2 border-gray-300 my-4"></hr>
               <div className="flex flex-col gap-2 mt-2">
                  <h1 className="text-cyan-800">Precisa de algo novo?</h1>
                  <h4 className="text-gray-500">
                     Aqui você encontra os melhores produtos com preços
                     incríveis. Atualizamos nosso catálogo diariamente para
                     atender todas as suas necessidades!
                  </h4>
               </div>
            </div>
            <div className="hidden sm:block w-[60%]">
               <video
                  className="w-full h-full object-cover rounded-l-[4rem]"
                  style={{ objectPosition: "-230px" }}
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

export default Login;

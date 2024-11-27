import { useEffect } from "react";
import video from "../assets/Video4.mp4";
import register from "./Register";
import { useNavigate } from "react-router-dom";

function Login() {
   const navigate = useNavigate();

   const handleRegisterPage = (e) => {
      e.preventDefault();

      navigate("/register");
   };

   useEffect(() => {
      const registerButton = document.getElementById("registerButton");

      registerButton.addEventListener("click", handleRegisterPage);
   });

   return (
      <div className="flex py-3 px-3 items-center justify-center bg-gray-200 min-h-screen">
         <div className="flex flex-col sm:flex-row bg-white w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
            <div className="w-full sm:w-1/2 p-8">
               <h1 className="text-2xl font-bold my-12">Welcome to Fluid</h1>
               <form className="flex flex-col">
                  <label htmlFor="email" className="text-sm mb-2">
                     E-mail
                  </label>
                  <input
                     type="email"
                     id="email"
                     placeholder="Digite seu e-mail"
                     className="p-2 border border-gray-300 rounded mb-4"
                  />
                  <label htmlFor="password" className="text-sm mb-2">
                     Senha
                  </label>
                  <input
                     type="password"
                     id="password"
                     placeholder="Digite sua senha"
                     className="p-2 border border-gray-300 mb-6"
                  />
                  <button
                     type="submit"
                     className="bg-cyan-800  hover:bg-cyan-600 text-white p-2 transition"
                  >
                     Entrar
                  </button>
                  <h2 className="mt-4">
                     Don't have an account?{" "}
                     <span className="text-cyan-800 cursor-pointer">
                        <button id="registerButton">Sign Up!</button>
                     </span>
                  </h2>
               </form>
               <hr class="border-t-2 border-gray-300 my-4"></hr>
               <div className="flex flex-col gap-2 mt-2">
                  <h1 className="text-cyan-800">Can you change your plan?</h1>
                  <h4 className="text-gray-500">
                     Whenever you want. Fluid will also change with you
                     according to your needs
                  </h4>
                  <h3 className="text-cyan-800">
                     <a href="#">Contact Us</a>
                  </h3>
               </div>
            </div>
            <div className="hidden sm:block w-[60%]">
               <video
                  className="w-full h-full object-cover rounded-l-[4rem]"
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

export default Login;

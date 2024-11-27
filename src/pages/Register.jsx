import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
   const navigate = useNavigate();

   const [name, setName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   useEffect(() => {
      const signUpButton = document.getElementById("signUpButton");

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

      signUpButton.addEventListener("click", handleSubmit);

      return () => {
         signUpButton.removeEventListener("click", handleSubmit);
      };
   }, [name, lastName, email, password, confirmPassword, navigate]);

   return (
      <div className="flex justify-center items-center w-screen h-screen">
         <form className="flex flex-col">
            <label htmlFor="name">Nome</label>
            <input
               type="text"
               id="name"
               placeholder="Digite seu nome"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="lastName">Sobrenome</label>
            <input
               type="text"
               id="lastName"
               placeholder="Digite seu sobrenome"
               value={lastName}
               onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="email">E-mail</label>
            <input
               type="text"
               id="email"
               placeholder="Digite seu e-mail"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Senha</label>
            <input
               type="password"
               id="password"
               placeholder="Digite sua senha"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
               type="password"
               id="confirmPassword"
               placeholder="Confirme sua senha"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button">Já possuo conta</button>
            <button type="button" id="signUpButton">
               Cadastrar conta
            </button>
         </form>
      </div>
   );
}

export default Register;

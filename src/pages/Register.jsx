function Register() {
   return (
      <>
         <div className="flex justify-center items-center w-screen h-screen">
            <form action="login" className="flex flex-col">
               <label htmlFor="name">Nome</label>
               <input type="text" id="name" placeholder="Digite seu nome" />
               <label htmlDFor="lastName">Sobrenome</label>
               <input
                  type="text"
                  id="lastName"
                  placeholder="Digite seu sobrenome"
               />
               <label htmlFor="email">E-mail</label>
               <input type="text" id="email" placeholder="Digite seu e-mail" />
               <label htmlFor="password">Senha</label>
               <input
                  type="password"
                  id="password"
                  placeholder="Digite sua senha"
               />
               <label htmlFor="password">Confirmar senha</label>
               <input
                  type="password"
                  id="password"
                  placeholder="Confirme sua senha"
               />
               <button>Ja possuo conta</button>
               <button>Cadastrar conta</button>
            </form>
         </div>
      </>
   );
}

export default Register;

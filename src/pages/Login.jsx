function Login() {
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
               <button>Ja possuo conta</button>
               <button>Cadastrar conta</button>
            </form>
         </div>
      </>
   );
}

export default Login;

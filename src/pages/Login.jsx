import minhaImagem from '../assets/4k.jpg';


function Login() {
   return (
      <div className="flex items-center justify-center bg-gray-200 h-screen">
         <div className="flex justify-between bg-white  h-[35rem] mr-[8rem] ml-[8rem]">
            <div className="pt-28 pl-16 pr-16">
               <div className="flex w-full">
                  <div className="flex flex-col">
                     <h1 className="text-2xl font-bold mb-4">Welcome to Fluid</h1>
                     <form className="flex flex-col">
                        <label htmlFor="email" className="text-sm mb-2">E-mail</label>
                        <input
                           type="text"
                           id="email"
                           placeholder="Digite seu e-mail"
                           className="p-2 pr-[5rem] border border-gray-300"
                        />
                        <label htmlFor="password" className="text-sm mt-6 mb-2">Senha</label>
                        <input
                           type="password"
                           id="password"
                           placeholder="Digite sua senha"
                           className="p-2 mb-6 border border-gray-300"
                        />
                        <button type="submit" className="bg-green-500 text-white p-2">
                           Entrar
                        </button>
                        <h4 className="mt-4">Don't have an account? <span className="text-blue-600">Sign Up!</span></h4>
                     </form>
                  </div>
               </div>
            </div>
            <img className='w-[50%] h-auto object-cover rounded-l-[3rem]' src={minhaImagem} alt="Imagem" />
         </div>
      </div>
   );
}

export default Login;

function SearchArea() {
   return (
      <div className="absolute top-[90px] right-[32px] bg-white w-96 h-12 flex justify-center items-center shadow-lg rounded-xl gap-2">
         <input
            type="text"
            placeholder="Pesquisar..."
            className="pl-4 py-3 w-full rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
         />
         <button className="w-[55px] h-full flex justify-center items-center">
            <svg
               className="w-6 h-6 text-gray-500"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
               ></path>
            </svg>
         </button>
      </div>
   );
}

export default SearchArea;

export default function Search() {
  return (
    <div className="flex flex-row flex-wrap gap-4 py-5 w-full">
      
      <input
        type="text"
        placeholder="search city"
        
        className="
          w-[75vw] lg:w-[40vw]
          h-[7vh]
          px-5
          text-lg md:text-xl lg:text-2xl
          bg-black border border-neutral-700
          rounded-md
          text-white placeholder:text-neutral-500
          focus:outline-none focus:ring-1 focus:ring-amber-400
          transition-all duration-300 ease-in-out
        "
      />

      <button
        id="searchButton"
        className="
          h-[7vh]
          px-9
          text-lg md:text-xl lg:text-2xl
          text-red-400
          font-bold uppercase tracking-wider
          bg-clip-text
          border border-neutral-700 rounded-md
          hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]
          transition-all duration-300
        "
      >
        Search
      </button>
    </div>
  );
}

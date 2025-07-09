export default function Search() {
    return (
        <div className="
            flex flex-row justify-between
        ">

            <input type="text" placeholder="Search City ..." className="
                w-[75vw] h-[8vh] mt-5 m-0 p-3
                lg:w-[40vw] lg:ml-5
                flex justify-self-center
                bg-[rgb(0,0,0)] rounded-[5px]
                text-white
            "/>
            <button className="
                w-[20vw] h-[8vh] m-0 mt-5 p-3
                md:text-2xl
                lg:w-[10vw] lg:text-3xl
                flex justify-self-center justify-center items-center
                font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-900 via-purple-400 to-amber-300
                hover:drop-shadow-xl hover:drop-shadow-[rgb(84,84,84)]
                active:bg-white
                transition-all duration-500
            " 
            id="searchButton">
                Search
            </button>

            {/* <input
                type="search"
                className="
                    w-[80vw] h-[10vh]
                    lg:w-[40vw] lg:h-[8vh]
                    m-5 p-5
                    text-black bg-[rgb(200,200,200)] rounded-[5px]
                "
                placeholder="Search City"
                id="searchCity"
            />
            <button
                className="
                    w-[10vw] h-[10vh]
                    lg:w-[10vw] lg:h-[10vh]
                    m-5
                    text-white
                "
                id="searchButton"
            >
                Search
            </button> */}
        </div>
    )
}
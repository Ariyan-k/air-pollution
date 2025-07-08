export default function Result() {
    return (
        <div className="
            w-[95vw] h-[30vh]
            mt-5
            lg:w-[50vw] lg:h-[60vh] lg:mt-0
            ml-5
            border-[3px] border-[rgb(229,229,229)] rounded-[5px] shadow-2xs shadow-gray-700 hover:shadow-2xl transition-all duration-500
            flex flex-col justify-start overflow-auto
            lg:self-start
            text-black
        ">
            <h2 className="text-white text-4xl font-bold m-2 ml-5 flex-start">Heading</h2>
            <h4 className="text-white text-2xl font-bold m-2 ml-5">Sub-heading</h4>
            <p className="text-white m-5 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore temporibus adipisci dolores minima architecto totam fugiat voluptatibus eligendi quaerat nihil cum dignissimos voluptates modi enim, delectus est! Aliquam, quisquam esse!</p>
        </div>
    )
}
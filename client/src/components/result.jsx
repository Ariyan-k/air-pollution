export default function Result() {
    return (
        <div className="
            w-[95vw] h-[30vh]
            mt-5
            lg:w-[50vw] lg:h-[60vh] lg:mt-0
            ml-5
            rounded-[5px] shadow-2xs
            flex flex-col justify-start overflow-auto
            lg:self-start
            gap-y-3
        ">
            <h2 className="text-[rgb(11,11,153)] text-4xl font-bold flex-start">Heading</h2>
            <h4 className="text-[rgb(32,210,50)] text-2xl font-bold">Sub-heading</h4>
            <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore temporibus adipisci dolores minima architecto totam fugiat voluptatibus eligendi quaerat nihil cum dignissimos voluptates modi enim, delectus est! Aliquam, quisquam esse!</p>
        </div>
    )
}
export default function Inputbox (props) {
    return (
        <>
            <input type={props.type} name={props.name} placeholder={props.placeholder} onChange={props.onChange} value={props.value}
                className="
                    w-[80vw] h-[6vh]
                    md:w-[30vw]
                    lg:w-[30vw]
                    p-5
                    border-2 border-white rounded-[5px] text-white
                "
            />
            <p className="
                w-[80vw] h-[2vh]
                md:w[30vw]
                lg:w-[30vw]
                flex justify-center items-center
                text-[10px] text-red-800
            ">{props.err}</p>
        </>
    )
}
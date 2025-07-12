export default function AboutHeatmap({date, time}) {
    return (
        <div className="
        w-auto h-auto
        text-[10px] lg:text-[12px] text-red-700
        absolute mt-5 mr-5 z-[750] top-[-2vh] right-[-1vw]
        ">
            Heatmap last updated at : time: {time} | date: {date}
        </div>
    )
}
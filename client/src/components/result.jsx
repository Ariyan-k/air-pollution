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
            gap-y-2
        ">
            <h2 className="text-[rgb(11,11,153)] text-2xl md:text-3xl lg:text-4xl font-bold flex-start">Region: Delhi</h2>
            <h4 className="text-[rgb(32,210,50)] text:xl md:text-2xl lg:text-2xl font-bold">Data Source: AI Forecast + Live Sensors</h4>
            <p className="text-red-800">(Our services are still in development. Data provided here is placeholder data.)</p>
            <p className="text-white text-[10px] md:text-[15px] lg:text-[17px]">
                AI Tips & Precautions:
                Avoid outdoor exercise during peak hours (2–5 PM).
                Use an N95 mask if AQI exceeds 150.
                Keep windows closed during heavy traffic hours.
                Drink plenty of water to help your body flush pollutants.
                Monitor updates hourly for sudden AQI spikes.
            </p>
            </div>
    )
}
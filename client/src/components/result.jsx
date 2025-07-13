export default function Result({reqCity}) {
  return (
    <div className="
      w-[95vw] lg:w-[50vw]
      h-[25vh] lg:h-[60vh]
      rounded-[5px] border border-neutral-700 lg:border-none
      bg-black
      shadow-lg hover:shadow-2xl transition-all duration-500
      flex flex-col justify-between gap-y-4 p-4
      text-white
      backdrop-blur-sm
      overflow-auto
    ">
      <div>
        <h2 className="text-2xl text-blue-400 lg:text-4xl font-semibold tracking-wide">
          Region: {reqCity.toUpperCase()}
        </h2>

        <h4 className="text-green-400 text-[17px] lg:text-2xl mt-4 font-semibold">
          Data Source: AI Forecast + Live Sensors
        </h4>

        <p className="text-sm lg:text-lg text-red-400 mt-1">
          (Our services are still in development. Data provided here is placeholder data.)
        </p>

        <div className="mt-4 text-[13px] lg:text-[17px] text-white leading-relaxed">
          <p><strong>AI Tips & Precautions:</strong></p>
          <ul className="list-disc ml-5">
            <li>Avoid outdoor exercise during peak hours (2–5 PM).</li>
            <li>Use an N95 mask if AQI exceeds 150.</li>
            <li>Keep windows closed during heavy traffic hours.</li>
            <li>Drink plenty of water to help your body flush pollutants.</li>
            <li>Monitor updates hourly for sudden AQI spikes.</li>
          </ul>
        </div>
      </div>

      <p className="text-[15px] lg:text-xl text-neutral-500 mt-4">
        Results based on: predictive algorithm
      </p>
    </div>
  );
}

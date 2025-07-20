export default function Result({reqCity}) {
  return (
    <div className="
      w-[95vw] lg:w-[50vw]
      h-[35vh] lg:h-[68vh]
      bg-black
      flex flex-col justify-between space-y-8 p-4 pt-1.5
      text-white
      overflow-auto
    ">
      <div className="space-y-2 lg:space-y-4">
        <h2 className="text-2xl text-blue-600 lg:text-4xl font-bold tracking-wide">
          Region: {reqCity.toUpperCase()}
        </h2>

        <h4 className="text-green-500 text-[17px] lg:text-2xl font-semibold">
          Data Source: AI Forecast + Live Sensors
        </h4>

        <p className="text-sm lg:text-lg text-red-400">
          (Our services are still in development. Data provided here is placeholder data.)
        </p>

        <div className="text-[13px] lg:text-[17px] ml-3 text-white leading-relaxed">
          <p><strong>AI Tips & Precautions:</strong></p>
          <ul className="list-disc">
            <li>Avoid outdoor exercise during peak hours (2–5 PM).</li>
            <li>Use an N95 mask if AQI exceeds 150.</li>
            <li>Keep windows closed during heavy traffic hours.</li>
            <li>Drink plenty of water to help your body flush pollutants.</li>
            <li>Monitor updates hourly for sudden AQI spikes.</li>
          </ul>
        </div>
      </div>

      <p className="text-[15px] lg:text-xl text-neutral-500">
        Results based on: predictive algorithm
      </p>
    </div>
  );
}

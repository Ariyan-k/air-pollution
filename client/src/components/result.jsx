export default function Result() {
  return (
    <div className="
      w-[95vw] lg:w-[50vw]
      h-auto lg:h-[60vh]
      mt-5 lg:mt-0 ml-5
      rounded-xl border border-neutral-700
      bg-gradient-to-br from-[#111111] to-[#1a1a1a]
      shadow-lg hover:shadow-2xl transition-all duration-500
      flex flex-col justify-between gap-4 p-6
      text-white
      backdrop-blur-sm
      overflow-auto
    ">
      <div>
        <h2 className="text-3xl text-blue-400 lg:text-4xl font-semibold tracking-wide">
          Region: New Delhi
        </h2>

        <div className="flex items-center gap-3 text-2xl lg:text-3xl font-medium mt-2">
          <span className="text-green-400 font-bold">105 AQI</span>
          <span className="text-neutral-400">|</span>
          <span className="text-green-400">Moderate</span>
        </div>

        <h4 className="text-green-400 text-xl lg:text-2xl mt-4 font-semibold">
          Data Source: AI Forecast + Live Sensors
        </h4>

        <p className="text-sm lg:text-lg text-red-400 mt-1">
          (Our services are still in development. Data provided here is placeholder data.)
        </p>

        <p className="text-lg lg:text-xl text-neutral-300 mt-4 leading-relaxed">
          New Delhi is currently experiencing moderate air quality with an AQI of 105.
          While generally acceptable for most individuals, sensitive groups may experience
          minor respiratory discomfort. It’s advisable to limit prolonged outdoor exposure
          if you're in a vulnerable category.
        </p>

        <div className="mt-4 text-[13px] lg:text-[17px] text-white leading-relaxed">
          <p><strong>AI Tips & Precautions:</strong></p>
          <ul className="list-disc ml-5">
            <li>Avoid outdoor exercise during peak hours (2–5 PM).</li>
            <li>Use an N95 mask if AQI exceeds 150.</li>
            <li>Keep windows closed during heavy traffic hours.</li>
            <li>Drink plenty of water to help flush pollutants.</li>
            <li>Monitor updates hourly for sudden AQI spikes.</li>
          </ul>
        </div>
      </div>

      <p className="text-lg lg:text-xl text-neutral-500 mt-4">
        Results based on: predictive algorithm
      </p>
    </div>
  );
}

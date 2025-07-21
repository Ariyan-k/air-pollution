export default function Userquerydisplay({reqCity, reqTime}) {

  return (
    <div className="
      w-[100vw] lg:w-[50vw] h-5
      p-2
      bg-black
      flex justify-center items-center
      text-[10px] md:text-[15px] lg:text-[15px] font-mono tracking-widest
      text-red-400

      mt-3
    ">
      REQUEST → CITY: <span className="mx-2 text-white font-bold">{reqCity.toUpperCase()}</span> | TIME: <span className="ml-2 text-white font-bold">{reqTime} HRS</span>
    </div>
  );
}

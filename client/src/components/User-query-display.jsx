export default function Userquerydisplay() {
  return (
    <div className="
      w-[95vw] lg:w-[50vw] h-5
      p-2
      bg-black
      shadow-md hover:shadow-xl transition-all duration-300
      flex justify-center items-center
      text-[10px] md:text-[15px] lg:text-[15px] font-mono tracking-widest
      text-red-400
      backdrop-blur-sm
    ">
      USER REQUEST → CITY: <span className="mx-2 text-white font-bold">DELHI</span> | TIME: <span className="ml-2 text-white font-bold">1220 HRS</span>
    </div>
  );
}

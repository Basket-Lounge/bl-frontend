import Image from "next/image";

export default function NavBar() {
  return (
    <div className="bg-color1 w-full py-[20px] px-[256px] flex items-center">
      <h2 className="text-white text-[20px] font-medium w-1/3">Basket Lounge</h2>
      <div className="flex items-center justify-center gap-[32px] w-1/3">
        <a href="#" className="font-medium text-[16px]">팀</a>
        <a href="#" className="font-medium">선수</a>
        <a href="#" className="font-medium">스케쥴</a>
      </div>
      <div className="flex justify-end w-1/3">
        <Image
          src="/icons/menu_24dp_FFFFFF.svg"
          alt="menu"
          width={32}
          height={20}
        />
      </div>
    </div>
  )
}
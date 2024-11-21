import { usePathname, useRouter } from "next/navigation";


interface ISectionOptionButtonProps<CustomType> {
  designatedSection: CustomType
  name: string;
  pathnameBit: string;
  realPathname?: string;
};

export default function SectionOptionButton<CustomType extends string>(
  { name, designatedSection, pathnameBit, realPathname }: ISectionOptionButtonProps<CustomType>
) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`${pathnameBit}/${designatedSection}`);
  }

  return (
    <button
      className={realPathname?.includes(designatedSection) ? "font-extrabold text-[16px]" : "font-medium text-[16px]"}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};
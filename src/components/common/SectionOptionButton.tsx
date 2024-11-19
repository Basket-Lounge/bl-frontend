import { usePathname, useRouter } from "next/navigation";


interface ISectionOptionButtonProps<CustomType> {
  designatedSection: CustomType
  name: string;
  pathname: string;
};

export default function SectionOptionButton<CustomType extends string>(
  { name, designatedSection, pathname }: ISectionOptionButtonProps<CustomType>
) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`${pathname}/${designatedSection}`);
  }

  return (
    <button
      className={pathname.includes(designatedSection) ? "font-extrabold text-[16px]" : "font-medium text-[16px]"}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};
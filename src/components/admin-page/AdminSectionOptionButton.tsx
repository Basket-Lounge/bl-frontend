import { usePathname, useRouter } from "next/navigation";


interface IAdminSectionOptionButtonProps {
  designatedSection: 'inquiries' | 'users' | 'reports';
  name: string;
};

export default function AdminSectionOptionButton(
  { name, designatedSection }: IAdminSectionOptionButtonProps
) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/admin/${designatedSection}`);
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
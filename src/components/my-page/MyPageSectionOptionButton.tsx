import { usePathname, useRouter } from "next/navigation";


interface IMyPageSectionOptionButtonProps {
  designatedSection: 'account-settings' | 'posts' | 'comments' | 'dms' | 'inquiries';
  name: string;
};

export default function MyPageSectionOptionButton({ name, designatedSection }: IMyPageSectionOptionButtonProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/my-page/${designatedSection}`);
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
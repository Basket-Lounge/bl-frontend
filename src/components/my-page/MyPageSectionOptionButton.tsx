import { TSection } from "@/app/teams/[teamId]/layout";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface IMyPageSectionOptionButtonProps {
  designatedSection: 'account-settings' | 'posts' | 'comments' | 'dms';
  name: string;
};

export default function MyPageSectionOptionButton({ name, designatedSection }: IMyPageSectionOptionButtonProps) {
  const pathname = usePathname();

  return (
    <Link href={`/my-page/${designatedSection}`}>
      <button
        className={pathname.includes(designatedSection) ? "font-extrabold text-[16px]" : "font-medium text-[16px]"}
      >
        {name}
      </button>
    </Link>
  );
};
import { useParams, usePathname, useRouter } from "next/navigation";


interface IUserSectionOptionButtonProps {
  designatedSection: "general-info" | "posts" | "comments";
  name: string;
};

export default function UserSectionOptionButton(
  { name, designatedSection }: IUserSectionOptionButtonProps
) {
  const { userId } = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/users/${userId}/${designatedSection}`);
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
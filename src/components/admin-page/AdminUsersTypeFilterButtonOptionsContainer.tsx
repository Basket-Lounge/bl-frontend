import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllRoles } from "@/api/admin.api";
import { translateRoleNameToKorean } from "@/utils/user.utils";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AdminUsersFilterButtonOption from "./AdminUsersFilterButtonOption";


const AdminUsersTypeFilterButtonOptionsContainer = () => {
  const rolesQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', 'roles'],
    queryFn: async () => {
      return await getAllRoles();
    }
  });
  const queryKey = "roles";

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [types, setTypes] = useState<string[]>(searchParams.get(queryKey)?.split(',') || []);

  const createQueryString = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (types.length === 0) {
      params.delete(queryKey)
    } else {
      params.set(queryKey, types.join(','))
    }

    return params.toString()
  }

  const handleRoleClick = (role: string) => {
    if (types.includes(role)) {
      setTypes(oldTypes => types.filter((type) => type !== role))
    } else {
      setTypes(oldTypes => [...oldTypes, role])
    }
  }

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(pathname + "?" + createQueryString())
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTypes([]);
    e.stopPropagation();
  }

  if (rolesQuery.isLoading) {
    return (
      <div className="absolute w-[350px] bg-color3 rounded-md p-[24px] z-10 flex gap-[16px] flex-wrap top-[150%] left-0">
        로딩중...
      </div>
    )
  }

  return (
    <div 
      className="absolute w-[350px] bg-color3 rounded-md p-[24px] z-10 flex gap-[16px] flex-wrap top-[150%] left-0"
    >
      {rolesQuery.data.map((role) => (
        <AdminUsersFilterButtonOption
          key={role.id}
          name={translateRoleNameToKorean(role.name)}
          value={role.id.toString()}
          clicked={types.includes(role.id.toString())}
          handleClick={handleRoleClick}
        />
      ))}
      <div className="w-full flex justify-start mt-[16px] gap-[16px]">
        <button
          className="bg-color4 text-white px-[12px] py-[8px] rounded-full w-full"
          onClick={handleResetClick}
        >
          초기화
        </button>
        <button
          className="bg-color4 text-white px-[12px] py-[8px] rounded-full w-full"
          onClick={handleApplyClick}
        >
          적용
        </button>
      </div>
    </div>
  )
}

export default AdminUsersTypeFilterButtonOptionsContainer;
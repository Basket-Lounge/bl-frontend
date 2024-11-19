import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


interface IAdminReportsFilterButtonOptionProps<CustomType> {
  name: string;
  queryKey: string;
  queryValue: CustomType;
};

const AdminReportsFilterButtonOption = <CustomType extends string>(
  { name, queryKey, queryValue } : IAdminReportsFilterButtonOptionProps<CustomType>
) => {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()
 
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const findQueryStringValue = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      return params.get(name)
    },
    [searchParams]
  )

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(pathname + "?" + createQueryString(queryKey, queryValue))
  }

  const bgColor = findQueryStringValue(queryKey) === queryValue ? "bg-white" : "bg-color1";
  const textColor = findQueryStringValue(queryKey) === queryValue ? "text-color1" : "text-white";

  return (
    <button
      onClick={handleClick}
      className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full " + bgColor + " " + textColor}
    >
      {name}
    </button>
  )
}

export default AdminReportsFilterButtonOption;
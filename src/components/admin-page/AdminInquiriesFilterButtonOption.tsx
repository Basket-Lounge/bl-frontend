import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


interface IAdminInquiriesFilterButtonOptionProps<CustomType> {
  name: string;
  queryKey: string;
  queryValue: CustomType;
};

const AdminInquiriesFilterButtonOption = <CustomType extends string>(
  { name, queryKey, queryValue } : IAdminInquiriesFilterButtonOptionProps<CustomType>
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

  const bgColor = findQueryStringValue(queryKey) === queryValue ? "bg-white" : "bg-color3";
  const textColor = findQueryStringValue(queryKey) === queryValue ? "text-color3" : "text-white";

  return (
    <button
      onClick={handleClick}
      className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full " + bgColor + " " + textColor}
    >
      {name}
    </button>
  )
}

export default AdminInquiriesFilterButtonOption;
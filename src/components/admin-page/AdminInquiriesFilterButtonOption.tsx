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

      const currentValue = params.get(name)?.split(',')
      if (currentValue) {
        if (currentValue.includes(value)) {
          currentValue.splice(currentValue.indexOf(value), 1)
          params.set(name, currentValue.join(','))
        } else {
          currentValue.push(value)
          params.set(name, currentValue.join(','))
        }
      } else {
        params.set(name, value)
      }
 
      return params.toString()
    },
    [searchParams]
  )

  const findQueryStringValue = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      const currentValue = params.get(name)?.split(',')
      if (currentValue) {
        return currentValue.includes(queryValue)
      } else {
        return false
      }
    },
    [searchParams]
  )

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(pathname + "?" + createQueryString(queryKey, queryValue))
  }

  const bgColor = findQueryStringValue(queryKey) ? "bg-white" : "bg-color1";
  const textColor = findQueryStringValue(queryKey) ? "text-color1" : "text-white";

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
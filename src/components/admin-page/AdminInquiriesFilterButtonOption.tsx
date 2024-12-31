import { AdminPageStoreContext } from "@/stores/admin.stores";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext } from "react";
import { useStore } from "zustand";


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

  const store = useContext(AdminPageStoreContext);
  const setInquiriesArgumentsModified = useStore(store, (state) => state.setInquiriesArgumentsModified);
 
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value);

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
    [searchParams, queryValue]
  )

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInquiriesArgumentsModified(true);
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
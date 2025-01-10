import { deleteNotification } from "@/api/notification.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ButtonLoading from "../common/ButtonLoading";


const UserNotificationsContainerListItemSettingsContainer = (
  { id } : { id: string }
) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || '1');

  const deleteNotificationMutation = useMutation({
    mutationFn: () => {
      return deleteNotification(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", "all", "pagination", page],
        exact: true
      });
    } 
  });

  const handleClick = () => {
    if (deleteNotificationMutation.isPending === false) {
      deleteNotificationMutation.mutate();
    }
  }

  return (
    <div
      className={`w-fit bg-color3 rounded-md z-50 divide-y divide-white flex flex-col items-stretch shadow-xl`}
    >
      <div className="px-[24px] flex flex-col items-start">
        <button 
          className="text-white text-[16px] font-medium py-[16px]"
          onClick={handleClick}
          disabled={deleteNotificationMutation.isPending}
        >
          {deleteNotificationMutation.isPending ? <ButtonLoading /> : "삭제"}
        </button>
      </div>
    </div>
  )
}

export default UserNotificationsContainerListItemSettingsContainer;
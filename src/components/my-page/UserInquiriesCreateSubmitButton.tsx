import { createInquiry } from "@/api/user.api";
import { MyPageStoreContext } from "@/app/my-page/layout";
import { InquiryCreateErrors } from "@/models/user.models";
import { UserInquiryValidation } from "@/utils/validation.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useStore } from "zustand";


const UserInquiriesCreateSubmitButton = () => {
  const store = useContext(MyPageStoreContext);
  const title = useStore(store, (state) => state.inquiriesCreateTitle);
  const typeId = useStore(store, (state) => state.inquiriesCreateTypeId);
  const content = useStore(store, (state) => state.inquiriesCreateContent);

  const updateTitle = useStore(store, (state) => state.updateInquiriesCreateTitle);
  const updateTypeId = useStore(store, (state) => state.updateInquiriesCreateTypeId);
  const updateContent = useStore(store, (state) => state.updateInquiriesCreateContent);
  const updateTitleError = useStore(store, (state) => state.updateInquiriesCreateTitleError);
  const updateTypeIdError = useStore(store, (state) => state.updateInquiriesCreateTypeIdError);
  const updateContentError = useStore(store, (state) => state.updateInquiriesCreateContentError);

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (post: { title: string, message: string, type: number }) => {
      return createInquiry(
        post.title, 
        post.message, 
        post.type
      );
    },
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['my-page', "inquiries", "pagination"],
      });

      // Reset the form
      updateTitle("");
      updateTypeId(null);
      updateContent("");
      updateTitleError(null);
      updateTypeIdError(null);
      updateContentError(null);

      router.push(`/my-page/inquiries?page=1`);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<InquiryCreateErrors>;
      if (!axiosError.response) {
        updateTitleError("알 수 없는 오류가 발생했습니다.");
        updateTypeIdError("알 수 없는 오류가 발생했습니다.");
        updateContentError("알 수 없는 오류가 발생했습니다.");
        return;
      }

      if (axiosError.response.status === 400) {
        updateTitleError(axiosError.response?.data.title?.[0] || null);
        updateTypeIdError(axiosError.response?.data.inquiry_type?.[0] || null);
        updateContentError(axiosError.response?.data.message?.[0] || null);
      }
    }
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationResults = UserInquiryValidation.safeParse({title, typeId, content});
    if (!validationResults.success) {
      const errorFormat = validationResults.error.format();

      const titleError = errorFormat.title?._errors.toString()
      updateTitleError(titleError || null);

      const typeIdError = errorFormat.typeId?._errors.toString()
      updateTypeIdError(typeIdError || null);

      const contentError = errorFormat.content?._errors.toString()
      updateContentError(contentError || null);

      return;
    }

    mutation.mutate({
      title,
      message: content,
      type: typeId as number
    });
  }

  if (mutation.isPending) {
    return <div>문의를 생성하는 중...</div>
  }
  
  return (
    <button 
      className="bg-color1 text-white rounded-full py-[12px] px-[24px] font-semibold"
      onClick={handleClick}
    >
      문의하기
    </button> 
  );
}

export default UserInquiriesCreateSubmitButton;
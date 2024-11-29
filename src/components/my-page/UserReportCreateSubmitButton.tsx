import { createReport } from "@/api/user.api";
import { UserStoreContext } from '@/stores/users.stores';
import { IReportCreateErrors } from "@/models/user.models";
import { UserReportValidation } from "@/utils/validation.utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { useStore } from "zustand";


const UserReportCreateSubmitButton = () => {
  const store = useContext(UserStoreContext);

  const title = useStore(store, (state) => state.reportCreateTitle);
  const typeId = useStore(store, (state) => state.reportCreateTypeId);
  const description = useStore(store, (state) => state.reportCreateDescription);

  const updateTitle = useStore(store, (state) => state.updateReportCreateTitle);
  const updateTypeId = useStore(store, (state) => state.updateReportCreateTypeId);
  const updateDescription = useStore(store, (state) => state.updateReportCreateDescription);

  const updateTitleError = useStore(store, (state) => state.updateReportCreateTitleError);
  const updateTypeIdError = useStore(store, (state) => state.updateReportCreateTypeIdError);
  const updateDescriptionError = useStore(store, (state) => state.updateReportCreateDescriptionError);

  const { userId } = useParams();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (post: { title: string, description: string, type: number }) => {
      return createReport(
        post.title, 
        post.description,
        post.type,
        parseInt(userId as string)
      );
    },
    onSuccess: () => {
      // Reset the form
      updateTitle("");
      updateTypeId(null);
      updateDescription("");

      updateTitleError(null);
      updateTypeIdError(null);
      updateDescriptionError(null);

      router.push(`/`);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<IReportCreateErrors>;
      if (!axiosError.response) {
        updateTitleError("알 수 없는 오류가 발생했습니다.");
        updateTypeIdError("알 수 없는 오류가 발생했습니다.");
        updateDescriptionError("알 수 없는 오류가 발생했습니다.");
        return;
      }

      if (axiosError.response.status === 400) {
        updateTitleError(axiosError.response?.data.title?.[0] || null);
        updateTypeIdError(axiosError.response?.data.report_type?.[0] || null);
        updateDescriptionError(axiosError.response?.data.description?.[0] || null);
        if (axiosError.response?.data.accused?.[0]) {
          updateDescriptionError(axiosError.response?.data.accused?.[0]);
        }
        if (axiosError.response?.data.non_field_errors) {
          updateTitleError(axiosError.response?.data.non_field_errors?.[0] || null);
        }
      }
    }
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationResults = UserReportValidation.safeParse({title, typeId, description});
    if (!validationResults.success) {
      const errorFormat = validationResults.error.format();

      const titleError = errorFormat.title?._errors.toString()
      updateTitleError(titleError || null);

      const typeIdError = errorFormat.typeId?._errors.toString()
      updateTypeIdError(typeIdError || null);

      const descriptionError = errorFormat.description?._errors.toString()
      updateDescriptionError(descriptionError || null);

      return;
    }

    mutation.mutate({
      title,
      type: typeId as number,
      description
    });
  }

  return (
    <button 
      className="bg-color1 text-white rounded-full py-[12px] px-[24px] font-semibold"
      onClick={handleClick}
      disabled={mutation.isPending}
    >
      {mutation.isError ? '다시 시도해주세요' : '신고하기'}
      {mutation.isPending ? '생성 중...' : null}
    </button> 
  );
}

export default UserReportCreateSubmitButton;
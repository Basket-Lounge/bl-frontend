import TeamHeaderLikeButtonSpinner from "../team-page/TeamHeaderLikeButtonSpinner"


const SpinnerLoading = () => {
  return (
    <div className="p-[24px] flex flex-col gap-[16px] items-center justify-center">
      <TeamHeaderLikeButtonSpinner />
    </div>
  )
}

export default SpinnerLoading;
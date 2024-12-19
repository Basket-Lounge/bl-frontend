import ButtonLoading from "./ButtonLoading";


const LoadingButton = () => {
  return (
    <button
      className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full bg-color3 text-white relative"}
      disabled={true}
    >
      <ButtonLoading />
    </button>
  )
}

export default LoadingButton;
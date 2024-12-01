const CuteErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col gap-[16px] items-stretch">
      <p className="font-bold text-[24px] lg:text-[32px] text-center">
        (つ╥﹏╥)つ
      </p>
      <p className="font-bold text-[16px] lg:text-[24px] text-center">
        {error}
      </p>
    </div>
  )
}

export default CuteErrorMessage;
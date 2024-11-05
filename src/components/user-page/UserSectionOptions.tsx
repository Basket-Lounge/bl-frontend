import MyPageSectionOptionButton from "./UserSectionOptionButton";


export default function UserSectionOptions() {
  return (
    <div className="flex gap-[24px] pb-[4px] border-b">
      <MyPageSectionOptionButton designatedSection="general-info" name="일반 정보" />
      <MyPageSectionOptionButton designatedSection="posts" name="작성 글" />
      <MyPageSectionOptionButton designatedSection="comments" name="댓글" />
    </div>
  )
}
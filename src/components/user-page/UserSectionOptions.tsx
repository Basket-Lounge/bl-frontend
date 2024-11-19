import UserSectionOptionButton from "./UserSectionOptionButton";


export default function UserSectionOptions() {
  return (
    <div className="flex gap-[24px] pb-[4px] border-b">
      <UserSectionOptionButton designatedSection="general-info" name="일반 정보" />
      <UserSectionOptionButton designatedSection="posts" name="작성 글" />
      <UserSectionOptionButton designatedSection="comments" name="댓글" />
    </div>
  )
}
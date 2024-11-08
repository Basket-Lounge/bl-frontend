import MyPageSectionOptionButton from "./MyPageSectionOptionButton";


export default function MyPageSectionOptions() {
  return (
    <div className="flex gap-[24px] pb-[4px] border-b">
      <MyPageSectionOptionButton designatedSection="account-settings" name="계정 설정" />
      <MyPageSectionOptionButton designatedSection="posts" name="작성 글" />
      <MyPageSectionOptionButton designatedSection="comments" name="댓글" />
      <MyPageSectionOptionButton designatedSection="dms" name="메시지" />
      <MyPageSectionOptionButton designatedSection="inquiries" name="문의" />
    </div>
  )
}
import AdminSectionOptionButton from "./AdminSectionOptionButton";


export default function AdminSectionOptions() {
  return (
    <section className="flex gap-[24px] pb-[4px] border-b">
      <AdminSectionOptionButton designatedSection="inquiries" name="문의 처리" />
      <AdminSectionOptionButton designatedSection="users" name="사용자 리스트" />
      <AdminSectionOptionButton designatedSection="reports" name="신고 처리" />
    </section>
  )
}
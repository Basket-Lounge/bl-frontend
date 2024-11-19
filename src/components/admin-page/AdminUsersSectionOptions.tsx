'use client'

import { TAdminUsersSection } from "@/models/admin.models";
import SectionOptionButton from "../common/SectionOptionButton";
import { usePathname } from "next/navigation";


export default function AdminUsersSectionOptions() {
  const pathname = usePathname();

  return (
    <div className="flex gap-[24px] pb-[4px] border-b">
      <SectionOptionButton<TAdminUsersSection> 
        designatedSection="account-settings" 
        name="계정 설정"
        pathname={pathname}
      />
      <SectionOptionButton<TAdminUsersSection> 
        designatedSection="posts" 
        name="작성 글"
        pathname={pathname}
      />
      <SectionOptionButton<TAdminUsersSection> 
        designatedSection="comments" 
        name="댓글"
        pathname={pathname}
      />
      <SectionOptionButton<TAdminUsersSection> 
        designatedSection="dms" 
        name="개인 메시지"
        pathname={pathname}
      />
      <SectionOptionButton<TAdminUsersSection> 
        designatedSection="inquiries" 
        name="문의"
        pathname={pathname}
      />
    </div>
  )
}
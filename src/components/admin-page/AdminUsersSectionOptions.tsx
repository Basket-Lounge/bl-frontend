'use client'

import { TAdminUsersSection } from "@/models/admin.models";
import SectionOptionButton from "../common/SectionOptionButton";
import { useParams, usePathname } from "next/navigation";


export default function AdminUsersSectionOptions() {
  const { userId } = useParams();
  const realPathname = usePathname();
  const pathnameBit = `/admin/users/${userId}`;

  return (
    <div className="flex gap-[24px] pb-[4px] border-b">
      <SectionOptionButton<TAdminUsersSection> 
        designatedSection="account-settings" 
        name="계정 설정"
        pathnameBit={pathnameBit}
        realPathname={realPathname}
      />
      <SectionOptionButton<TAdminUsersSection> 
        designatedSection="posts" 
        name="작성 글"
        pathnameBit={pathnameBit}
        realPathname={realPathname}
      />
      <SectionOptionButton<TAdminUsersSection> 
        designatedSection="comments" 
        name="댓글"
        pathnameBit={pathnameBit}
        realPathname={realPathname}
      />
      <SectionOptionButton<TAdminUsersSection> 
        designatedSection="dms" 
        name="개인 메시지"
        pathnameBit={pathnameBit}
        realPathname={realPathname}
      />
    </div>
  )
}
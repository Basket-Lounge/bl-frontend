'use client'

export default function AdminUserDetailsLayout({children}: {children: React.ReactNode}) {
  return (
    <section className="flex flex-col gap-[24px] items-stretch">
      {children}
    </section>
  )
}
import Layout from "@/components/Layout"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}


interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-radial from-sidebar-accent to-sidebar dark">
      {children}
    </div>
  )
}

export default Layout
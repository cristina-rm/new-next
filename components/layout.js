import Nav from "./nav";

const Layout = ({ children, workspaces, seo }) => (
  <div className="min-h-screen flex space-x-10">
    <Nav workspaces={workspaces} />

    <div className="mx-auto container px-6 sm:px-10 py-12 flex justify-center">
        <div className="w-full flex flex-col justify-start items-start">
            {children}
        </div>
    </div>
  </div>
);

export default Layout;
import Nav from "./nav";
import { UserProvider } from "../lib/authContext";

const Layout = ({ children, workspaces, user, loading = false }) => (
    <UserProvider value={{user, loading}}>
      <div className="min-h-screen flex space-x-10">
        <Nav workspaces={workspaces} />

        <div className="mx-auto container px-6 sm:px-10 py-12 flex justify-center">
            <div className="w-full flex flex-col justify-start items-start">
                <main>{children}</main>
            </div>
        </div>
      </div>
    </UserProvider>
);

export default Layout;
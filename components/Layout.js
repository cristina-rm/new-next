import Nav from "./Nav";
import { UserProvider } from "../lib/authContext";

const Layout = ({ children, workspaces, user='', loading = false }) => (
    <UserProvider value={{user, loading}}>
      <div className="min-h-screen flex space-x-10">
        <Nav workspaces={workspaces} auth_user={user} />

        <div className="mx-auto container px-6 sm:px-10 py-12 flex justify-center">
            <div className="w-full flex flex-col justify-start items-start">
                {children}
            </div>
        </div>
      </div>
    </UserProvider>
);

export default Layout;
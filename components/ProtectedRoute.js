import { appRoutes } from "../lib/constants";
import { useFetchUser } from "../lib/authContext";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ router, children }) => {
  //Identify authenticated user
  const { user, jwt } = useFetchUser();
  const isAuthenticated = jwt;
  // console.log()

  let unprotectedRoutes = [
    appRoutes.LOGIN_PAGE,
    /*appRoutes.FORGOT_PASSWORD,
    appRoutes.RESET_PASSWORD,
    appRoutes.EMAIL_SENT,
    appRoutes.VERIFY_EMAIL,
    appRoutes.NEWS_FEED_PAGE,
    appRoutes.CONTENT_DETAILS_PAGE,*/
    appRoutes.HOME_PAGE,
  ];

  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
  console.log('isBrowser(): ', isBrowser()); // true
  console.log('!isAuthenticated ', !isAuthenticated); // false
  console.log('pathIsProtected ', pathIsProtected); // true
  console.log('condition: ', (isBrowser() && !isAuthenticated && pathIsProtected)); // true

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    console.log('appRoutes.LOGIN_PAGE: ', appRoutes.LOGIN_PAGE); // true
    router.push(appRoutes.LOGIN_PAGE);
  } /*else {
    router.push(appRoutes.HOME_PAGE);
  }*/

  return children;
};

export default ProtectedRoute;
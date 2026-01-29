   
import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
/** * Logout Page Component.
 * Initiates the logout process using MSAL and redirects the user upon completion.
 * @component
 *  @returns {JSX.Element} The rendered Logout page.  
 *  @remarks
 *  This page triggers the logout process when mounted, using the MSAL instance to handle authentication.
 *  It redirects the user to the home page after logging out.
 *  @see useMsal  
 *  @see useEffect
 */ 
const LogoutPage: React.FC = () => {
    
  const { instance } = useMsal();
    
  useEffect(() => {
      const logout = async () => {
        try {
          await instance.logoutRedirect({
            postLogoutRedirectUri: "/",
          });
          
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };

      logout();
    }, [instance])

    return <div>Logging out...</div>;

}
export default LogoutPage;
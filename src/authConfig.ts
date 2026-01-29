const redirectUri = window.location.origin;

export const msalConfig = {
  auth: {
    clientId: '83309702-c12e-4b09-ad0e-34ddd7578ceb',
    authority: 'https://login.microsoftonline.com/d1e4b8cf-68fe-4d18-98d5-b7e9c99173cf',
    redirectUri,
    postLogoutRedirectUri: redirectUri
    
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};
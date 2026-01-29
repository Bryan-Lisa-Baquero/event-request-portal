import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './authConfig.ts'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { MsalProvider } from '@azure/msal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export const msalInstance = new PublicClientApplication(msalConfig);
const queryClient = new QueryClient();

async function main() {
    // Ensure MSAL is ready before rendering
    await msalInstance.initialize();
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <MsalProvider instance={msalInstance}>
                <AuthProvider>
                     <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </AuthProvider>            
            </MsalProvider>
        </StrictMode>,
    );
}

await main();
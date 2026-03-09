import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import CustomCursor from '../components/CustomCursor';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CustomCursor />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

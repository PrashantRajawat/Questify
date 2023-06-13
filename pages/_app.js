import "@/styles/globals.css";
import AppProvider from "./Context";
import { useEffect, useState } from "react";
export default function App({ Component, pageProps }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

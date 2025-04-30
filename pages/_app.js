import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import "react-toastify/dist/ReactToastify.css";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      {loading && <Loader />}
      <Component {...pageProps} />
    </SessionProvider>
  );
}

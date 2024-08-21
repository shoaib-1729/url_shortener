/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import Signup from "./Signup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { UrlState } from "@/context";
const Auth = () => {
  // hook for querying params from the url
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  // agar user authenticated hai tab usko '/auth' ka access matt do, wapas dashboard pr router karwa do
  useEffect(() => {
    // agar user authenticated hai aur loading false hai toh user ko redirect karwa do dashboard par.
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}'` : ""}`);
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="mt-36 flex flex-col items-center gap-10 text-5xl font-extrabold">
      <h1>
        {
          /* `/auth?createNew=${longUrl}` url ho tab, login first bolkar batao user ko ki url shorten karne se pehle login kare. */
          searchParams.get("createNew")
            ? "Hold Up! Let's login first..."
            : "Login / Signup"
        }
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;

/* eslint-disable react-hooks/exhaustive-deps */
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import Error from "./Error";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "@/db/apiUrls";
import { UrlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClicks";

const Dashboard = () => {
  // states for input query
  const [searchQuery, setSearchQuery] = useState();
  const { user } = UrlState();
  // call the api's for url's using useFetch custom hook
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);
  // call the api's for clicks using useFetch custom hook, and pass the userId, user mei se userId nikaal lo filter laga kar, phir paas kardo
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    user?.filter((url) => url?.id)
  );
  // make api calls to load all of our urls and clicks as soon as our components loads up
  // load urls
  useEffect(() => {
    fnUrls();
  }, []);
  // load clicks if urls exist for a particular user
  useEffect(() => {
    if (urls?.length) {
      fnClicks();
    }
  }, [user.length]);
  // filter the urls according to the query searched inside the input field
  const filteredUrls = urls?.filter((url) => {
    return url.title.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return (
    <div className="flex flex-col gap-8">
      {true && <BarLoader width={"100%"} color="#36d767" />}
      {/* div for showing total links created and total clicks  */}
      <div className="grid grid-cols-2 gap-4">
        {/* total links */}
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>
        {/* total clicks */}
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>
      </div>
      {/* div for creating link  */}
      <div className="flex  justify-between">
        <h1 className="text-4xl font-extrabold">My Links </h1>
        <Button>Create Link</Button>
      </div>
      {/* div for rendering links created by a particular user */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links ..."
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        {/* filter component */}
        <Filter className="absolute top-2 right-2 p-1" />
        {/* if any error is there */}
        <Error />
      </div>
    </div>
  );
};

export default Dashboard;

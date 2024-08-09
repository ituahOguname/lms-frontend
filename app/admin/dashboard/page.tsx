import React, {FC} from "react";
import PageTitle from "../components/pageTitle";
import { Search } from "../components/search";
import { UserNav } from "../components/user-nav";
import Notifcation from "../components/notifcation";

type Props = {

}

const Dashboard:FC<Props> = ({}) => {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-12">
          <PageTitle title="Dashboard" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
            <Notifcation />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full p"></div>
    </>
  );
}

export default Dashboard
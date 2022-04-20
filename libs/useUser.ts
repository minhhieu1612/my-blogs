import { useEffect } from "react";
import Router from "next/router";
import useSWR from "../node_modules/swr";
import { User } from "../pages/api/user";
import endpoints from "../utils/services/endpoints";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>(endpoints.USER);

  useEffect(() => {
    // if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {      
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}

import { useQuery } from "@tanstack/react-query";

import { getAuthUser } from "../lib/api";

function useAuthUser() {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };

  // we do .user because from backend we sent data in the res.status(201).json({ success: true, user: newUser })
}

export default useAuthUser;

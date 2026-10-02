import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api.js";
const useSignup = () => {
 const queryClient = useQueryClient();
 const {mutate,error,isPending}=useMutation({
  mutationFn:signup,
  onSuccess:()=>queryClient.invalidateQueries({queryKey:["authUser"]})
 });
  return {isPending,error,signupmutation:mutate}
};

export default useSignup;   
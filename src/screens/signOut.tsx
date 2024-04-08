import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { signOut } from "../store/profile.ts";

const SignOutScreen = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(signOut())
  }, []);
  return <></>;
};


export default SignOutScreen

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllClassSessions } from "../redux/actions/classSession.action";

export const useClassSessionData = () => {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.classSession);

  useEffect(() => {
    dispatch(getAllClassSessions());
  }, [dispatch]);

  return { sessions };
};

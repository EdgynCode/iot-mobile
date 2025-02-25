import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { listAllUsersByType } from "../redux/actions/user.action";

export const useStudentData = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.data || {});

  useEffect(() => {
    dispatch(listAllUsersByType("Learner"));
  }, [dispatch]);

  return { students };
};

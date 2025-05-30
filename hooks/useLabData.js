import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllLabs } from "../redux/actions/lab.action";

export const useLabData = () => {
  const dispatch = useDispatch();
  const labs = useSelector((state) => state.labs.data || {});
  const loading = useSelector((state) => state.labs.loading);

  useEffect(() => {
    dispatch(getAllLabs());
  }, [dispatch]);

  return { labs, loading };
};

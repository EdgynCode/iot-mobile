import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getExperimentsByLabId } from "../redux/actions/experiment.action";

export const useExperimentData = (id) => {
  const dispatch = useDispatch();
  const experiments = useSelector((state) => state.experiments.data || {});
  const loading = useSelector((state) => state.experiments.loading);
  const error = useSelector((state) => state.experiments.error);

  useEffect(() => {
    dispatch(getExperimentsByLabId(id));
  }, [dispatch, id]);

  return { experiments, loading, error };
};

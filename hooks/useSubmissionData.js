import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSubmissionsByAssignment } from "../redux/actions/submission.action";

export const useSubmissionData = (assignmentId) => {
  const dispatch = useDispatch();
  const submissions = useSelector((state) => state.submissions.data || {});
  const loading = useSelector((state) => state.submissions.loading);
  const error = useSelector((state) => state.submissions.error || null);

  useEffect(() => {
    dispatch(getSubmissionsByAssignment(assignmentId));
  }, [dispatch, assignmentId]);

  return { submissions, loading, error };
};

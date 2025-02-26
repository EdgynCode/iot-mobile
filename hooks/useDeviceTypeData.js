import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDeviceTypes } from "../redux/actions/device.action";

export const useDeviceTypeData = () => {
  const dispatch = useDispatch();
  const deviceTypes = useSelector((state) => state.devicetypes.data || {});
  const loading = useSelector((state) => state.devicetypes.loading);

  useEffect(() => {
    dispatch(getAllDeviceTypes());
  }, [dispatch]);

  return { deviceTypes, loading };
};

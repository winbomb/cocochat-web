import { useAppSelector } from "@/app/store";
import { shallowEqual } from "react-redux";
import { LicenseResponse } from "@/types/server";

// License 功能已移除，返回默认值
const useLicense = (_refetchOnMountOrArgChange = false) => {
  const upgraded = useAppSelector((store) => store.server.upgraded, shallowEqual);

  return {
    upgraded,
    reachLimit: false,
    license: null as LicenseResponse | null,
    checked: false,
    isLoading: false,
    checking: false,
    upserting: false,
    upserted: false,
    checkLicense: () => {},
    upsertLicense: async () => false
  };
};

export default useLicense;

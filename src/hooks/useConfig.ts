import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { isEqual } from "lodash";

import {
  useGetLoginConfigQuery,
  useUpdateLoginConfigMutation,
} from "@/app/services/server";
import { LoginConfig } from "@/types/server";

// config: login
type ConfigType = "login";
type ConfigMap = Record<ConfigType, LoginConfig>;
type valuesOf<T> = T[keyof T];
let originalValue: valuesOf<ConfigMap> | undefined = undefined;

export default function useConfig(config: keyof ConfigMap = "login") {
  const { t: ct } = useTranslation();
  const [changed, setChanged] = useState(false);
  const [values, setValues] = useState<valuesOf<ConfigMap> | undefined>(undefined);
  const [updateLoginConfig, { isSuccess: LoginUpdated, isLoading: LoginUpdating }] =
    useUpdateLoginConfigMutation();
  const { refetch: getLoginConfig, data: loginConfig } = useGetLoginConfigQuery(undefined, {
    skip: config !== "login",
  });

  const updateFns = {
    login: updateLoginConfig,
  };
  const requests = {
    login: getLoginConfig,
  };
  const updates = {
    login: LoginUpdated,
  };
  const updatings = {
    login: LoginUpdating,
  };
  const updateConfig = updateFns[config];
  const refetch = requests[config];
  const updated = updates[config];
  const updating = updatings[config];
  const reset = () => {
    setValues(originalValue ? { ...originalValue } : undefined);
  };

  const toggleEnable = () => {
    setValues((prev) => {
      if (prev && "enabled" in prev) {
        return { ...prev, enabled: !prev.enabled };
      }
      return prev;
    });
  };

  useEffect(() => {
    if (updated) {
      toast.success(ct("tip.update"));
      refetch();
    }
  }, [updated]);
  useEffect(() => {
    const _config = loginConfig;
    if (_config) {
      originalValue = _config;
      setValues(_config);
    }
  }, [loginConfig]);
  useEffect(() => {
    // 空对象
    if (!values || Object.keys(values).length == 0) return;
    if (!isEqual(originalValue, values)) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [values]);

  return {
    originalValues: originalValue,
    updating,
    updated,
    reset,
    changed,
    updateConfig,
    values,
    setValues,
    toggleEnable,
    refetch,
  };
}

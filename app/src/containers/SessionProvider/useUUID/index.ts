import { useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import { UUID_FIELD } from "../../../utils/constants";

export const useUUID = () => {
  const uuid: string = localStorage[UUID_FIELD]
    ? localStorage[UUID_FIELD]
    : uuidv1();

  useEffect(() => {
    if (!localStorage[UUID_FIELD]) {
      localStorage.setItem(UUID_FIELD, uuid);
    }
  }, [uuid]);

  return uuid;
};

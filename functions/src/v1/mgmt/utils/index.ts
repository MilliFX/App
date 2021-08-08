import { MyAccount } from "../../../utils/api/MyFXBook";

export const isArchivedAccount = ({ name }: MyAccount): boolean =>
  name.includes("Archive");

export const isCommissionAccount = ({ name }: MyAccount): boolean =>
  name.includes("Commission");

import { MyAccount } from "../../../utils/api/MyFXBook";

export const isAccountArchived = ({ name }: MyAccount): boolean =>
  name.includes("Archive");

import { isAccountArchived } from "./index";
// TODO: Fix jest.mock import
// eslint-disable-next-line jest/no-mocks-import
import { sampleMyAccount } from "../../../utils/api/MyFXBook/getMyAccount/__mocks__/myAccount";

describe("mgmt utils", function () {
  describe("isAccountArchived", function () {
    it("should return true when accountName contains `archive`", function () {
      // Arrange
      const accountName = "Archived: Some Account";
      // Act
      const isArchived = isAccountArchived({
        ...sampleMyAccount,
        name: accountName,
      });
      // Assert
      expect(isArchived).toBeTruthy();
    });
    it("should return false when accountName does not contains `archive`", function () {
      // Arrange
      const accountName = "Some Account";
      // Act
      const isArchived = isAccountArchived({
        ...sampleMyAccount,
        name: accountName,
      });
      // Assert
      expect(isArchived).toBeFalsy();
    });
  });
});

import { isArchivedAccount, isCommissionAccount } from "./index";
// TODO: Fix jest.mock import
// eslint-disable-next-line jest/no-mocks-import
import { sampleMyAccount } from "../../../utils/api/MyFXBook/getMyAccount/__mocks__/myAccount";

describe("mgmt utils", function () {
  describe("isArchivedAccount", function () {
    it("should return true when accountName contains `archive`", function () {
      // Arrange
      const accountName = "Archived: Some Account";
      // Act
      const isArchived = isArchivedAccount({
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
      const isArchived = isArchivedAccount({
        ...sampleMyAccount,
        name: accountName,
      });
      // Assert
      expect(isArchived).toBeFalsy();
    });
  });

  describe("isCommissionAccount", function () {
    it("should return true when accountName contains `Commission`", function () {
      // Arrange
      const accountName = "Some Account - Commission";
      // Act
      const isArchived = isCommissionAccount({
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
      const isArchived = isCommissionAccount({
        ...sampleMyAccount,
        name: accountName,
      });
      // Assert
      expect(isArchived).toBeFalsy();
    });
  });
});

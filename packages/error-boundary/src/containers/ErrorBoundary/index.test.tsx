import * as React from "react";
import { render } from "@testing-library/react";
import ErrorBoundary from "./index";
import { ERROR_MESSAGE } from "../../utils/constants";
import * as Sentry from "@sentry/react";

describe("<ErrorBoundary />", () => {
  const mockVersion = "commitSHA";

  describe("when <ErrorBoundary /> is used", () => {
    it("should call Sentry.init()", () => {
      const spy = jest.spyOn(Sentry, "init");

      render(
        <ErrorBoundary version={mockVersion}>
          <div>App</div>
        </ErrorBoundary>
      );

      expect(spy).toHaveBeenCalled();
    });
  });
  describe("when an unhandled error is thrown", () => {
    const mockError = new Error("Network Error!");
    const Throws = () => {
      throw mockError;
    };

    it(`should show GenericComponent`, () => {
      const { getByText } = render(
        <ErrorBoundary version={mockVersion}>
          <Throws />
        </ErrorBoundary>
      );

      getByText(ERROR_MESSAGE);
    });

    it(`should call sentry.captureException()`, () => {
      const spy = jest.spyOn(Sentry, "captureException");

      render(
        <ErrorBoundary version={mockVersion}>
          <Throws />
        </ErrorBoundary>
      );

      expect(spy).toHaveBeenCalledWith(mockError);
    });
  });
});

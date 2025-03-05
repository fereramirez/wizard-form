import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {expect, it, describe, vi} from "vitest";
import userEvent from "@testing-library/user-event";
import {type FormEventHandler} from "react";

import {Form} from "@/components/funnel/form";

describe("Form", () => {
  it("renders with correct text", () => {
    const mockOnSubmit = vi.fn();
    const testText = "test form";

    const {getByText} = render(
      <Form onSubmit={mockOnSubmit}>
        <span>{testText}</span>
      </Form>,
    );

    const span = getByText(testText);

    expect(span).toBeInTheDocument();
  });

  it("should call onSubmit", async () => {
    const mockOnSubmit = vi.fn((e: React.FormEvent<HTMLInputElement>) => e.preventDefault());
    const testText = "submit";

    const {getByRole} = render(
      <Form onSubmit={mockOnSubmit as unknown as FormEventHandler<HTMLFormElement>}>
        <button type="submit">{testText}</button>
      </Form>,
    );

    const button = getByRole("button", {name: testText});

    await userEvent.click(button);

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});

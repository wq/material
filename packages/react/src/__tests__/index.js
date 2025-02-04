import React from "react";
import { render } from "@testing-library/react";
import { useComponents, withWQ, createFallbackComponent } from "../hooks.js";

const TestComponentFallback = {
    components: {
        View: createFallbackComponent("View", "@wq/material"),
    },
};

// eslint-disable-next-line no-global-assign
console = {
    warn: jest.fn(),
};

function TestComponent({ children }) {
    const { View } = useComponents();
    return <View>{children}</View>;
}

const TestComponentWithWQ = withWQ(TestComponent, {
    fallback: TestComponentFallback,
});

test("wq fallback", () => {
    render(<TestComponentWithWQ>Test Component</TestComponentWithWQ>);
    expect(console.warn).toHaveBeenCalledWith(
        "Missing <View/>!  Try rendering within <Root/> from @wq/material."
    );
    console.warn.mockClear();
});

test("wq override", () => {
    const { getByText } = render(
        <TestComponentWithWQ
            wq={{
                components: {
                    View({ children }) {
                        return <div className="test">{children}</div>;
                    },
                },
            }}
        >
            Test Component
        </TestComponentWithWQ>
    );
    expect(console.warn).not.toHaveBeenCalled();
    expect(getByText("Test Component").className).toBe("test");
});

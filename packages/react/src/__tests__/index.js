import React from "react";
import { render } from "@testing-library/react";
import {
    useComponents,
    withWQ,
    createFallbackComponent,
    mergeWQContexts,
} from "../hooks.js";

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

test("merge contexts", () => {
    const Test = () => null,
        TestIcon = () => null;

    expect(mergeWQContexts({}, {})).toEqual({
        fallback: {
            config: {},
            messages: {},
            components: {},
            icons: {},
        },
        defaults: {
            config: {},
            messages: {},
            components: {},
            icons: {},
        },
        overrides: {
            config: {},
            messages: {},
            components: {},
            icons: {},
        },
    });
    expect(
        mergeWQContexts(
            {
                fallback: {
                    components: {
                        Test,
                    },
                },
                defaults: { config: { test: 1 } },
                overrides: {
                    icons: {
                        TestIcon,
                    },
                },
            },
            {}
        )
    ).toEqual({
        fallback: {
            config: {},
            messages: {},
            components: {
                Test,
            },
            icons: {},
        },
        defaults: {
            config: { test: 1 },
            messages: {},
            components: {},
            icons: {},
        },
        overrides: {
            config: {},
            messages: {},
            components: {},
            icons: {
                TestIcon,
            },
        },
    });
    expect(
        mergeWQContexts(
            {},
            {
                fallback: {
                    components: {
                        Test,
                    },
                },
                defaults: { config: { test: 1 } },
                overrides: {
                    icons: {
                        TestIcon,
                    },
                },
            }
        )
    ).toEqual({
        fallback: {
            config: {},
            messages: {},
            components: {
                Test,
            },
            icons: {},
        },
        defaults: {
            config: { test: 1 },
            messages: {},
            components: {},
            icons: {},
        },
        overrides: {
            config: {},
            messages: {},
            components: {},
            icons: {
                TestIcon,
            },
        },
    });
    expect(
        mergeWQContexts(
            {
                fallback: {
                    components: {
                        Test,
                    },
                },
                defaults: {
                    config: { test2: { info: 1, test: true } },
                },
            },
            {
                defaults: { config: { test: 1, test2: { test: false } } },
                overrides: {
                    icons: {
                        TestIcon,
                    },
                },
            }
        )
    ).toEqual({
        fallback: {
            config: {},
            messages: {},
            components: {
                Test,
            },
            icons: {},
        },
        defaults: {
            config: { test: 1, test2: { info: 1, test: false } },
            messages: {},
            components: {},
            icons: {},
        },
        overrides: {
            config: {},
            messages: {},
            components: {},
            icons: {
                TestIcon,
            },
        },
    });
});

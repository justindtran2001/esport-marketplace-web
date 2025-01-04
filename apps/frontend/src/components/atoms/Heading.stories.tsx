import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "./Heading";

const meta = {
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "heading 123",
    level: 3,
  },
};

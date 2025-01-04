import { Space } from "antd";
import { Link, LinkProps } from "../atoms";

export type NavigatorItem = Pick<LinkProps, "href" | "target"> & {
  label: string;
};

export type NavigatorProps = {
  items: NavigatorItem[];
};

export const Navigator = ({ items }: NavigatorProps) => {
  return (
    <Space direction="horizontal" size="large">
      {items.map(({ label, ...linkProps }, idx) => (
        <Link
          {...linkProps}
          key={`nav-item-${idx}`}
          style={{ fontWeight: "bold" }}
        >
          {label.toUpperCase()}
        </Link>
      ))}
    </Space>
  );
};

import { useEffect, useState } from "react";
import Title from "../atoms/Title";

export default function Step({
  title,
  children,
  collapsed,
}: {
  title: string;
  children: React.ReactNode;
  collapsed: boolean;
}) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  return (
    <div className="row">
      <Title>{title}</Title>

      {isCollapsed ? (
        <div>
          <a
            className="btn-flat teal-text"
            onClick={() => {
              setIsCollapsed(false);
            }}
          >
            Show detail
          </a>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}

import parseHtmlStringToHtml, { domToReact, Text } from "html-react-parser";
import { useMemo } from "react";

export const HTMLRenderer = ({
  htmlString = "",
  className,
  type,
}: {
  type?: string;
  htmlString: string;
  className?: string;
}) => {
  const parsedElement = useMemo(() => {
    return parseHtmlStringToHtml(htmlString, {
      transform: (reactNode: any, domNode: any) => {
        if (reactNode && reactNode.type === "ol") {
          const dToReact: any = domToReact(domNode.children);
          if (Array.isArray(dToReact)) {
            return (
              <ol className="list-decimal pl-5">
                {dToReact.map((item, index) => {
                  if (!item.props.children) return null;
                  return (
                    <li
                      key={index}
                      style={{ fontSize: 12 }}
                      className="!text-xs"
                    >
                      {item.props.children}
                    </li>
                  );
                })}
              </ol>
            );
          } else {
            return (
              <ol className="list-decimal pl-5">
                <li style={{ fontSize: 12 }} className="!text-xs">
                  {dToReact.props.children}
                </li>
              </ol>
            );
          }
        } else if (reactNode && reactNode.type) {
          return <>{reactNode && domToReact(domNode.children)}</>;
        }
      },
    });
  }, [htmlString]);
  return <div className="text-sm space-y-2">{parsedElement}</div>;
};

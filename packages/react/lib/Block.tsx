import React from "react";
import debug from "debug";
import { BlockValues, TextSection, TextModifier } from "@notion-cms/types";
import NotionLink from "./NotionLink";
import Callout from "./Callout";

const log = debug("notion-cms:react");

interface Props {
  block: BlockValues;
}

const applyModifier = (
  children: JSX.Element,
  mod: TextModifier
): JSX.Element => {
  switch (mod[0]) {
    case "b":
      return <strong>{children}</strong>;
    case "i":
      return <em>{children}</em>;
    case "a":
      return <a href={mod[1]}>{children}</a>;
    case "p":
      return (
        <NotionLink pageId={mod[1]}>
          Page <code>{mod[1]}</code>
        </NotionLink>
      );
    default:
      log('Ignoring unknown text modifier "%s": %O', mod[0], mod);
      return children;
  }
};
const Text = (sections: TextSection[]) => {
  if (!sections) return "";

  return sections.map(([text, modifiers = []]) => {
    const NewlinedText = (
      <React.Fragment>
        {text
          .split("\n")
          .reduce(
            (arr, text) => [...arr, arr.length > 0 ? <br /> : null, text],
            []
          )}
      </React.Fragment>
    );
    return modifiers.reduce(applyModifier, NewlinedText);
  });
};

const Block: React.FC<Props> = ({ block }) => {
  switch (block.type) {
    case "header":
      return <h1>{Text(block.properties?.title)}</h1>;
    case "sub_header":
      return <h2>{Text(block.properties?.title)}</h2>;
    case "sub_sub_header":
      return <h3>{Text(block.properties?.title)}</h3>;
    case "text":
      return <p>{Text(block.properties?.title)}</p>;
    case "image":
      return <img src={block.properties.source[0][0]} />;
    case "bulleted_list":
    case "numbered_list":
      return <li key={block.id}>{Text(block.properties?.title)}</li>;
    case "divider":
      return <hr />;
    case "callout":
      return (
        <Callout
          colour={block.format.block_color}
          icon={block.format.page_icon}
        >
          {Text(block.properties?.title)}
        </Callout>
      );
    default:
      log('Ignoring unknown block type "%s": %O', block.type, block);
      return null;
  }
};

export default Block;

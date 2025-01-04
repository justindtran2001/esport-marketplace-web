import { Character } from "@/data/models";
import { CharacterAuthor, CharacterAuthorProps } from "./CharacterAuthor";
import { Flex } from "antd";
import { Image, Text } from "../atoms";

export type CharacterCardProps = Omit<Character, "id" | "author"> & {
  author: CharacterAuthorProps;
};

export const CharacterCard = (props: CharacterCardProps) => {
  const { name, price, author, category, image, cssBackground } = props;

  return (
    <Flex
      vertical
      gap={10}
      style={{
        background: "rgba(58, 56, 65, 0.6)",
        borderRadius: 10,
        width: "16em",
        padding: "1em",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <Text
          strong
          style={{
            position: "absolute",
            top: "1em",
            left: "1em",
            zIndex: 2,
            backgroundColor: "rgba(49, 59, 69, 0.5)",
            color: "white",
            padding: "0.2em 0.5em",
            borderRadius: 5,
          }}
        >
          {category}
        </Text>
        <Image
          src={image.src}
          aria-label={image.ariaLabel}
          width="100%"
          style={{
            zIndex: 1,
            objectFit: "cover",
            aspectRatio: "1/1",
            background: cssBackground,
          }}
        />
      </div>
      <Flex vertical={false} justify="space-between" align="center">
        <Text
          strong
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Text>
        <Flex gap="small">
          <img src="/logos_ethereum.svg" />
          <Text strong>{`${price} ETH`}</Text>
        </Flex>
      </Flex>
      <CharacterAuthor {...author} />
    </Flex>
  );
};

import { Flex, Spin } from "antd";
import { SpotlightCharacterCard } from "../molecules";
import useSpotlightCharacters from "@/hooks/useSpotlightCharacters";
import { Heading } from "../atoms";

export const HeroSection = () => {
  const { characters, loading } = useSpotlightCharacters();

  return (
    <Spin spinning={loading}>
      <Flex
        vertical
        style={{
          position: "relative",
          width: "100vw",
          height: "45em",
        }}
      >
        <img
          src="/background-image.jpeg"
          style={{
            position: "absolute",
            width: "100%",
            height: "40em",
            objectFit: "cover",
            filter: "opacity(30%)",
            zIndex: 0,
          }}
        />
        <img
          src="/newArrivalTitle.svg"
          height="auto"
          width="900rem"
          style={{ position: "relative", left: "10em", top: "4em" }}
        />
        <Flex
          style={{
            backgroundColor: "rgba(251, 198, 37, 1)",
            position: "absolute",
            bottom: 0,
            height: "18em",
            width: "100%",
          }}
          gap="large"
          justify="center"
        >
          {characters.map(({ id, image, name }) => (
            <SpotlightCharacterCard
              key={`spotlight-character-card-${id}`}
              image={image}
              name={name}
            />
          ))}
          <div
            style={{
              alignSelf: "end",
              position: "relative",
              height: "40em",
              width: "30em",
            }}
          >
            <img
              src="/dj-character-spotlight.png"
              aria-label="dj-character-spotlight"
              style={{
                height: "100%",
              }}
            />
            <Flex
              vertical
              align="center"
              style={{
                position: "absolute",
                bottom: "1em",
              }}
            >
              <img src="/spotlight-char-title-background.svg" />
              <Heading
                level={1}
                style={{
                  position: "absolute",
                  bottom: "0.4em",
                  left: "20%",
                  fontSize: "3.5rem",
                  fontFamily: "Drone Ranger Pro Bold",
                }}
              >
                THE DJ
              </Heading>
            </Flex>
          </div>
        </Flex>
      </Flex>
    </Spin>
  );
};

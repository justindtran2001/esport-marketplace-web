import { ConfigProvider, theme } from "antd";
import { Marketplace } from "./components/templates";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#DA34DD",
          colorInfo: "#DA34DD",
          fontFamily: "Inter",
        },
        components: {
          Layout: {
            headerBg: "rgba(23, 22, 26, 0.7)",
            footerBg: "rgba(23, 22, 26, 1)",
          },
          Typography: {
            titleMarginTop: "0em",
            colorLink: "white",
            colorLinkHover: "#da458f",
          },
          Button: {
            defaultHoverBorderColor: "#da458f",
            defaultHoverColor: "#da458f",
            defaultActiveBorderColor: "#da458f",
            defaultActiveColor: "#da458f",
            colorBorder: "#da458f",
            borderRadius: 4,
          },
          Slider: {
            handleActiveColor: "#da458f",
            handleActiveOutlineColor: "#da458f",
            trackHoverBg: "#da458f",
            railBg: "#3A3841",
            railHoverBg: "#3A3841",
          },
        },
      }}
    >
      <Marketplace />
    </ConfigProvider>
  );
}

export default App;

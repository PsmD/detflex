const deviceSizes = {
  smaller: "500px",
  small: "900px",
  navSmall: "1200px",
  laptop: "1530px",
  desktop: "1900px",
};

const device = {
  smaller: `screen and (max-width: ${deviceSizes.smaller})`,
  small: `screen and (max-width: ${deviceSizes.small})`,
  navSmall: `screen and (max-width: ${deviceSizes.navSmall})`,
  laptop: `screen and (min-width: ${deviceSizes.laptop})`,
  desktop: `screen and (min-width: ${deviceSizes.desktop})`,
};

const theme = {
  device,
};

export default theme;

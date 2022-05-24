const deviceSizes = {
  mobile: "490px",
  tablet: "768px",
  laptop: "1530px",
  desktop: "1900px",
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (min-width: ${deviceSizes.laptop})`,
  desktop: `screen and (min-width: ${deviceSizes.desktop})`,
};

const theme = {
  device,
};

export default theme;

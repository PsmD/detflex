const deviceSizes = {
  mobile: "490px",
  tablet: "768px",
  laptop: "1536px",
  desktop: "1920px",
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
  desktop: `screen and (max-width: ${deviceSizes.laptop})`,
};

const theme = {
  device,
};

export default theme;

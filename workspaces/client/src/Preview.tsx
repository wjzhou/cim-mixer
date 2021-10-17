import Box from "@mui/material/Box";
import type { Instance } from "./App";
import PreviewOne from "./PreviewOne";
export default function Preview(props: {
  index: number;
  instances: Instance[];
  width: number;
}) {
  const { index, instances, width } = props;
  const imgWidth = width > 800 ? width / 2 - 20 : width;
  if (index === -1) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-between",
          m: 1,
        }}
      >
        {instances.map((a) => (
          <Box>
            <div>{a.name}</div>
            <PreviewOne index={0} width={imgWidth} scene="" />
          </Box>
        ))}
      </Box>
    );
  }
  return null;
}

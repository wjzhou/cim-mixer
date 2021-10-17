import ky from "ky";
import React from "react";
import { useInterval } from "./useInterval";
export default function PreviewOne(props: {
  index: number;
  scene?: string;
  width: number;
}) {
  const { index, scene, width } = props;
  const ref = React.createRef<HTMLImageElement>();
  useInterval(() => {
    const url = `/getScreenShot/${index}/${scene}?width=${width}`;
    return ky
      .get(url)
      .text()
      .then((result) => {
        if (ref.current) {
          ref.current.src = result;
        }
      })
      .catch((error) => {
        console.log("getScreenShot error", url, error);
      });
  }, 1000);
  return <img ref={ref} alt="preview" style={{ backgroundColor: "black" }} />;
}

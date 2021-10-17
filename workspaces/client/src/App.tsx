import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Container from "@mui/material/Container";
import ForwardIcon from "@mui/icons-material/Forward";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import ky from "ky";
import type {
  RespondGetScenes,
  RespondGetInstances,
} from "../../server/src/types";
import { Button, NativeSelect } from "@mui/material";
import Preview from "./Preview";
import useWindowDimensions from "./useWindowDimensions";

const theme = createTheme();
export type Instance = {
  name: string;
  index: number;
  currentScene: string;
  nextScene: string;
  scenes: string[];
};

type State =
  | {
      loading: true;
    }
  | {
      loading: false;
      currentScene: string;
      nextScene: string;
      selectedInstanceIndex: number;
      instances: Instance[];
    };

async function getDefaultState(): Promise<State> {
  const instanceNames = await ky
    .get("/getInstances")
    .json<RespondGetInstances>();
  const instances: Instance[] = [];
  for (let i = 0; i < instanceNames.length; ++i) {
    const result = await ky.get(`/getScenes/${i}`).json<RespondGetScenes>();
    instances.push({
      ...result,
      nextScene: result.currentScene,
      name: instanceNames[i],
      index: i,
    });
  }

  const mainOutput = instances[0];
  const state: State = {
    loading: false,
    selectedInstanceIndex: -1,
    currentScene: mainOutput.currentScene,
    nextScene: mainOutput.currentScene,
    instances,
  };
  return state;
}

function App() {
  const [state, setState] = useState<State>({ loading: true });
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    (async () => {
      const state = await getDefaultState();
      setState(state);
    })();
  }, []);
  if (state.loading) {
    return (
      <Container>
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="h1" color="inherit" noWrap>
            Loading...
          </Typography>
        </Stack>
      </Container>
    );
  }
  async function handleSelectEvent(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    if (state.loading === false) {
      const nextScene = event.target.value;
      //setState({ ...state, nextScene: event.target.value });
      for (const instance of state.instances) {
        await ky.post(`/setScene/${instance.index}/${nextScene}`);
      }
    }
  }

  async function handlePresentClick() {
    await ky.post(`/openProjector`);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ backgroundColor: "#eee" }}>
        <Toolbar>
          <Stack direction="row" spacing={2} width={1}>
            <Button
              variant="contained"
              endIcon={<PresentToAllIcon />}
              onClick={handlePresentClick}
            >
              Present
            </Button>
            <Box sx={{ backgroundColor: "white", flexGrow: 1 }}>
              <NativeSelect
                fullWidth
                id="next-scene-select-label"
                defaultValue={state.nextScene}
                onChange={handleSelectEvent}
              >
                {state.instances[0].scenes.map((a) => {
                  return <option value={a}>{a}</option>;
                })}
              </NativeSelect>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <main>
        <Preview
          index={state.selectedInstanceIndex}
          instances={state.instances}
          width={width}
        ></Preview>
      </main>
    </ThemeProvider>
  );
}

export default App;

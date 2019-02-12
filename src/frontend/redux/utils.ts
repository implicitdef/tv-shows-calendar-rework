import { useMappedState, useDispatch } from "redux-react-hook";
import { TheState } from "../redux/state";
import { ThisDispatch } from "./actions";

export const useThisMappedState: <A>(
  mapState: (state: TheState) => A
) => A = useMappedState as any;

export const useThisDispatch: () => ThisDispatch = useDispatch as any;

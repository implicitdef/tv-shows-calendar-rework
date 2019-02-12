import { useMappedState, useDispatch } from "redux-react-hook";
import { State } from "../redux/state";
import { ThisDispatch } from "./actions";

export const useThisMappedState: <A>(
  mapState: (state: State) => A
) => A = useMappedState as any;

export const useThisDispatch: () => ThisDispatch = useDispatch as any;

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export function useNotification () {
    return useSelector((state: RootState) => state.notification)
}
import { useEffect } from "react";
import "./App.css";

import { AppRouter } from "./routes/AppRouter";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/actions/user.actions";
import {
  getFavoriteEvents,
  getFavoriteWorkshops,
} from "./redux/actions/favorite.actions";
import { getAllWorkshops } from "./redux/actions/workshop.actions";
import { getAllEvents } from "./redux/actions/event.actions";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllWorkshops());
    dispatch(getAllEvents());
    if (!loading && isAuthenticated) {
      dispatch(getFavoriteWorkshops());
      dispatch(getFavoriteEvents());
    }
  }, [isAuthenticated]);

  return <AppRouter />;
}

export default App;

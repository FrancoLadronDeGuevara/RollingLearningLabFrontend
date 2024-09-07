import { useDispatch } from "react-redux";
import "./App.css";

import { AppRouter } from "./routes/AppRouter";
import { useEffect } from "react";
import { getUser } from "./redux/actions/user.actions";
import { getAllWorkshops } from "./redux/actions/workshop.actions";
import { getAllEvents } from "./redux/actions/event.actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllWorkshops());
    dispatch(getAllEvents());
  }, []);

  return <AppRouter />;
}

export default App;

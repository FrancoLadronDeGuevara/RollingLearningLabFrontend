import { useDispatch } from "react-redux";
import "./App.css";

import { AppRouter } from "./routes/AppRouter";
import { useEffect } from "react";
import { getUser } from "./redux/actions/user.actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return <AppRouter />;
}

export default App;

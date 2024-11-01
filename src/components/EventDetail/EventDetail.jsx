import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEvent } from "../../redux/actions/event.actions";
import Loader from "../Loader/Loader";
import { Container, Divider } from "@mui/material";
import { CardDetail } from "../CardDetail/CardDetail";
import CommentSection from "../CommentSection/CommentSection";

export const EventDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { event, loading } = useSelector((state) => state.event);
	const isWorkshop = false

  React.useEffect(() => {
    dispatch(getEvent(id));
    return console.log(event);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="lg" disableGutters>
      <CardDetail
        id={id}
        isWorkshop={isWorkshop}
        loading={loading}
        workOrEven={event}
      />
      <Divider />
      <CommentSection isWorkshop={isWorkshop} />
    </Container>
  );
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getWorkshop } from "../../redux/actions/workshop.actions";
import Loader from "../../components/Loader/Loader";
import { DetailDesktop } from "../DetailView/DetailDesktop";

const WorkshopDetail = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { workshop, loading } = useSelector((state) => state.workshop);

  useEffect(() => {
    dispatch(getWorkshop(id));
  }, []);

  return (
    <>
      {loading && <Loader />}
      <DetailDesktop workshop={workshop} pathname={pathname}/>
    </>
  );
};

export default WorkshopDetail;

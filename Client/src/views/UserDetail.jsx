// hooks, routers, reducers:
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserId } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const UserDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const detailId = params.id;

  useEffect(() => {
    dispatch(getUserId(detailId));
  }, [detailId]);

  const userID = useSelector((state) => state?.userID);

  return (
    //! falta componente para renderizar details
    <div>
      <NavBar />
      <div className="flex">
        <SideBar />
        <h1>{userID.name}</h1>
      </div>
    </div>
  );
};

export default UserDetail;

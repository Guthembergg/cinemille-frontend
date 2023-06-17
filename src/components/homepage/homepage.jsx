import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, Card, Grid, Row, Text } from "@nextui-org/react";
import NavbarCustom from "./NavbarCustom";
import FilmPage from "./FilmPage";

function Homepage() {
  const myProfile = useSelector((state) => state.myProfile);
  const navigate = useNavigate();

  return (
    <>
      <FilmPage />
    </>
  );
}

export default Homepage;

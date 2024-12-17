import { Link } from "react-router-dom";
import Back from "../../assets/arrow_back_24px.svg";

import s from "./GoBackBtn.module.css";
const BtnBack = () => {
  return (
        <Link className={s.back} onclick={() => window.history.back()}>
          <img src={Back} alt="неполадки" />
          GO BACK
        </Link>
  );
};

export default BtnBack;
// import style from "./mensaje.modules.css";
import style from "./mensaje.module.css";

export default function Mensage({mensaje}) {
  console.log(style)
  return <h1 className={style.mensaje}>{mensaje}</h1>
}
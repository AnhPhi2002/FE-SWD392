import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Logo from "../../../assets/images/Logomark.png";
import { Link } from "react-router-dom";
export function AvatarLogo() {
  return ( 
  <Link to={"/"}>
    <Avatar >
      <AvatarImage src={Logo} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
 </Link>
  )
}

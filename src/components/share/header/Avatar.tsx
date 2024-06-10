import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Logo from "../../../assets/images/Logomark.png";
export function AvatarLogo() {
  return ( 
  <div>
    <Avatar>
      <AvatarImage src={Logo} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    </div>
  )
}

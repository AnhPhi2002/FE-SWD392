import AmexIcon from "@/assets/icons/ColoredIcons/AmexIcon";
import GoogleIcon from "@/assets/icons/ColoredIcons/GoogleIcon";
import MastercardIcon from "@/assets/icons/ColoredIcons/MastercardIcon";
import VisaIcon from "@/assets/icons/ColoredIcons/VisaIcon";


type ColoredIconsPropsType = {
  icon:
    | 'amex'
    | 'google'
    | 'mastercard'
    | 'visa'
   
 ;
};
const ColoredIcons = ({ icon, ...props }: ColoredIconsPropsType & React.HTMLAttributes<SVGSVGElement>) => {
  switch (icon) {
    case 'amex': {
      return <AmexIcon {...props} />;
    }
    case 'google': {
      return <GoogleIcon {...props} />;
    }
    case 'mastercard': {
      return <MastercardIcon {...props} />;
    }
    case 'visa': {
      return <VisaIcon {...props} />;
    }
   
  }

};

export default ColoredIcons;
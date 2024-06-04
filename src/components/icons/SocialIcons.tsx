
import FacebookIcon from "@/assets/icons/Social Icons/FacebookIcon";
import GithubIcon from "@/assets/icons/Social Icons/GithubIcon";
import InstagramIcon from "@/assets/icons/Social Icons/InstagramIcon";
import PinterestIcon from "@/assets/icons/Social Icons/PinterestIcon";
import TelegramIcon from "@/assets/icons/Social Icons/TelegramIcon";
import TwitterIcon from "@/assets/icons/Social Icons/TwitterIcon";
import WhatsappIcon from "@/assets/icons/Social Icons/WhatsappIcon";
import YoutubeIcon from "@/assets/icons/Social Icons/YoutubeIcon";


type SocialIconsPropsType = {
  icon:
    | 'facebook'
    | 'github'
    | 'instagram'
    | 'pinterest'
    | 'telegram'
    | 'twitter'
    | 'whatsapp'
    | 'youtube'
 ;
};
const SocialIcons = ({ icon, ...props }: SocialIconsPropsType & React.HTMLAttributes<SVGSVGElement>) => {
  switch (icon) {
    case 'facebook': {
      return <FacebookIcon {...props} />;
    }
    case 'github': {
      return <GithubIcon {...props} />;
    }
    case 'instagram': {
      return <InstagramIcon {...props} />;
    }
    case 'pinterest': {
      return <PinterestIcon {...props} />;
    }
    case 'telegram': {
      return <TelegramIcon {...props} />;
    }
    case 'twitter': {
      return <TwitterIcon {...props} />;
    }
    case 'whatsapp': {
      return <WhatsappIcon {...props} />;
    }
    case 'youtube': {
      return <YoutubeIcon {...props} />;
    }
  }
};

export default SocialIcons;

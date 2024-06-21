// import React from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// import Iconography from "@/components/icons/Iconography";

// interface PageTitleProps {
//   pageTitle: string;
//   pagesub: string;
// }

// const PageTitle: React.FC<PageTitleProps> = ({ pageTitle, pagesub }) => {
//   const { t } = useTranslation();

//   return (
//     <div className="py-4 bg-gray-100">
//       <div className="container mx-auto px-4">
//         <nav className="flex items-center text-gray-600 text-sm">
//           <Link to="/" className="hover:underline flex items-center">
          
//             {t("header-navigation.home")}
//           </Link>
//           <Iconography icon="arrow-right" />
//           <span>{pageTitle}</span>
          
//           <span className="font-medium text-gray-900">{pagesub}</span>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default PageTitle;

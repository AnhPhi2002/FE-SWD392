import React from "react";
import { useTranslation } from "react-i18next";

import img1 from "../../assets/images/7770d102-2a12-464d-8ba0-b97380f59554.png";

import SocialIcons from "@/components/icons/SocialIcons";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <> 
      <section className="about-page-area py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="lg:w-1/2 w-full px-4">
              <div className="about-page-left">
                <h4 className="text-xl text-red-600 mb-2 font-medium capitalize">
                  {t("About Us")}
                </h4>
                <h3 className="text-4xl text-primary mb-4 font-bold capitalize leading-tight">
                  {t("We Are Committed To Providing Safe Dairy Products")}
                </h3>
                <p className="mb-4 text-lg leading-relaxed text-gray-600">
                  Claritas est etiam processus dynamicus, qui sequitur
                  mutationem consuetudi- um lectorum. Mirum est notare quam
                  littera gothica, quam nunc putamus parum claram, anteposuerit
                  litterarum formas humanitatis per seacula quarta decima et
                  quinta decima.
                </p>
                <p className="mb-4 text-lg leading-relaxed text-gray-600">
                  Eodem modo typi, qui nunc nobis videntur parum clari, fiant
                  sollemnes in futurum.litterarum formas humanitatis per seacula
                  quarta decima et quinta decima
                </p>
                <div className="about-page-call flex items-center mt-6">
                  <div className="page-call-icon text-5xl text-red-600 mr-6">
                    <SocialIcons icon="whatsapp" />
                  </div>
                  <div className="call-info">
                    <p className="text-red-600 text-lg capitalize font-medium">
                      {t("Need Any Help?")}
                    </p>
                    <h4 className="text-primary text-2xl font-bold">
                      <a href="https://www.facebook.com/HuyBQ5321?locale=vi_VN">(431) 529 2093</a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full px-4 mt-6 lg:mt-0 pl-40">
              <div className="about-page-right">
                <div className="relative">
                  <img src={img1} alt="about page" className="w-full h-auto object-cover"/>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   
    </>
  );
};

export default AboutPage;

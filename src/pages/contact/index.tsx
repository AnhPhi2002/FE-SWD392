import React from 'react';
import GetInTouch from './components/GetInTouch';
import ContactInformation from './components/ContactInformation';

const ContactPage: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-20 flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 p-4  ">
          <GetInTouch />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <ContactInformation />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

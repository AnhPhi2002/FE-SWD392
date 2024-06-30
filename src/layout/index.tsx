import Footer from "@/components/share/footer";
import Header from "@/components/share/header";
import Chat from "@/components/share/chat/Chat";


function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div> 
    <Header />
    </div>
    <div>
    <Chat/>
    </div>
    <div> 
    {children}
    </div>
    <div> 
    <Footer />
    </div>    
    </>
  );
};

export default Layout;

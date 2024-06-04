import Iconography from "./components/icons/Iconography"
import SocialIcons from "./components/icons/SocialIcons"
import { Button } from "./components/ui/button"



function App() {
  

  return (
    <>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Button>Click me</Button>
   
    <Iconography  icon="add-to-cart"/>
    </>
  )
}

export default App

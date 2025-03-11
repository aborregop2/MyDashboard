import TopBar from "../components/ui/TopBar"


export default function Dashboard({ darkMode }: { darkMode: boolean }) {
  
  return (
    <>
      <TopBar /> 
    
      <h1>Hola {darkMode}</h1>
    </>
  )
}


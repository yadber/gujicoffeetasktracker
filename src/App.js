import { BrowserRouter,Routes,Route } from "react-router-dom";


import Header from './components/Header'
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Report from "./pages/Report";
import Task from "./pages/Task";
import Dashboard from "./pages/Dashboard";

// task 1 is የገቢ ምርት መረከብያ ሰነድ
import Task1 from "./task_page/Task1";
import Task2 from "./task_page/Task2";
import Task3 from "./task_page/Task3";
import Task4 from "./task_page/Task4";



export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  function onThemeClick(){
    setDarkTheme(prevState => !prevState);
  }
  useEffect(() => {
      darkTheme?
        document.body.style.background = "rgb(240, 253, 244)" 
      :
        document.body.style.background = "rgb(30, 31, 30)"
      
  }, [darkTheme])
  
 
  return (
    <>
    <BrowserRouter>
    <Header theme={darkTheme} onThemeClick={onThemeClick}/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/report" element={<Report/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/task" element={<Task theme={darkTheme}/>}/>

      <Route path="/task/task1" element={<Task1/>} />
      <Route path="/task/task2" element={<Task2/>} />
      <Route path="/task/task3" element={<Task3/>} />
      <Route path="/task/task4" element={<Task4/>} />
    </Routes>

    </BrowserRouter>
      
    </>
  )
}



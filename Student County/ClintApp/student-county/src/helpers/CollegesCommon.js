import React,{createContext,useEffect,useState}  from 'react'
import CollegeServices from '../services/CollegeServices'


const CollegesCxt = createContext();

export function CollegesProvider({children}){

  const [Colleges,setColleges]=useState([])

  const [College]=useState({
    "id":"0",
    "name":""
})

  
  useEffect(() => {
    CollegeServices.getColleges().then((res) => {
        setColleges(res.data)
        })
        
      
}, []);


return(
  <CollegesCxt.Provider value={{Colleges,College}}>
  {children}
  </CollegesCxt.Provider>
)
}

export default CollegesCxt
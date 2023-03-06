import React,{createContext,useEffect,useState}  from 'react'
import UniversityServices from '../services/UniversityServices'


const UniversitiesCxt = createContext();

export function UniversitiesProvider({children}){

  const [Universities,setUniversities]=useState([])
  const [University]=useState({
    "id":"0",
    "name":"",
    "emailDomainName":""
  })
  
  useEffect(() => {
    UniversityServices.getUniversities().then((res) => {
        setUniversities(res.data)
        });
        
      
}, []);


return(
  <UniversitiesCxt.Provider value={{Universities,University}}>
  {children}
  </UniversitiesCxt.Provider>
)
}

export default UniversitiesCxt
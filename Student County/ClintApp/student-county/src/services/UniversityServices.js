import axios from 'axios';

const UNIVERSITY_API_BASE_URL = "https://localhost:7245/University/";

class UniversityServices {

    getEmployees(){
      const tt= axios.get(UNIVERSITY_API_BASE_URL+"Index");
      //console.log(tt)
      return tt
    }

    createEmployee(university){
        return axios.post(UNIVERSITY_API_BASE_URL, university);
    }

    getEmployeeById(universityId){
        return axios.get(UNIVERSITY_API_BASE_URL + '/' + universityId);
    }

    updateEmployee(university, universityId){
        return axios.put(UNIVERSITY_API_BASE_URL + '/' + universityId, university);
    }

    deleteEmployee(universityId){
        return axios.delete(UNIVERSITY_API_BASE_URL + '/' + universityId);
    }
}

export default new UniversityServices()


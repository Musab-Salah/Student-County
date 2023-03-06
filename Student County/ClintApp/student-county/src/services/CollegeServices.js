import axios from 'axios';

const COLLEGE_API_BASE_URL = "https://localhost:7245/College/";

class CollegeServices {

    async getColleges(){
      return await axios.get(COLLEGE_API_BASE_URL+"Index"); 
    }

    async createCollege(college){
        return await axios.post(COLLEGE_API_BASE_URL + 'Create/', college);
    }

    async getCollegeById(collegeId){
        return await axios.get(COLLEGE_API_BASE_URL + 'Get/' + collegeId);
    }

    async updateCollege(collegeId, college){
        return await axios.put(COLLEGE_API_BASE_URL + 'Update/' + collegeId, college);
    }

    async deleteCollege(collegeId){
        return await axios.delete(COLLEGE_API_BASE_URL + 'Delete/' + collegeId);
    }
}

export default new CollegeServices()


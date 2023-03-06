import axios from 'axios';

const STUDENT_API_BASE_URL = "https://localhost:7245/Student/";

class StudentServices {

    async getStudents(){
      return await axios.get(STUDENT_API_BASE_URL+"Index"); 
    }

    async createStudent(student){
        return await axios.post(STUDENT_API_BASE_URL + 'Create/', student);
    }

    async getStudentById(studentId){
        return await axios.get(STUDENT_API_BASE_URL + 'Get/' + studentId);
    }

    async updateStudent(studentId, student){
        return await axios.put(STUDENT_API_BASE_URL + 'Update/' + studentId, student);
    }

    async deleteStudent(studentId){
        return await axios.delete(STUDENT_API_BASE_URL + 'Delete/' + studentId);
    }
}

export default new StudentServices()


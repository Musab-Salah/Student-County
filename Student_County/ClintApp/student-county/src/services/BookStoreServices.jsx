import axios from "axios";

const BOOKSTORE_API_BASE_URL = "https://localhost:7245/BookStore/";

class BookStoreServices {
  async getBooks() {
    return await axios.get(BOOKSTORE_API_BASE_URL + "/BookStore/Index");
  }

  async createBook(book) {
    return await axios.post(BOOKSTORE_API_BASE_URL + "/BookStore/Create/", book);
  }

  async getBookById(bookId) {
    return await axios.get(BOOKSTORE_API_BASE_URL + "/BookStore/Get/" + bookId);
  }

  async updateBook(bookId, book) {
    return await axios.put(BOOKSTORE_API_BASE_URL + "/BookStore/Update/" + bookId, book);
  }

  async deleteBook(bookId) {
    return await axios.delete(BOOKSTORE_API_BASE_URL + "/BookStore/Delete/" + bookId);
  }
}
// eslint-disable-next-line
export default new BookStoreServices();

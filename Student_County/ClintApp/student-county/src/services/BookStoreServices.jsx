import axios from "../api/axios";

const BOOKSTORE_API_BASE_URL = "/BookStore";

class BookStoreServices {
  getBooks = async (token) =>
    await axios.get(BOOKSTORE_API_BASE_URL + "/Index", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  getMyAllBooks = async (userid, token) =>
    await axios.get(
      BOOKSTORE_API_BASE_URL + "/GetMyAllBooks?userid=" + userid,
      {
        params: {
          userid: userid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  createBook = async (book, token) =>
    await axios.post(BOOKSTORE_API_BASE_URL + "/Create", book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  getBookById = async (bookId) =>
    await axios.get(BOOKSTORE_API_BASE_URL + "/Get/" + bookId);

  updateBook = async (bookId, book) =>
    await axios.put(BOOKSTORE_API_BASE_URL + "/Update/" + bookId, book);

  deleteBook = async (bookId) =>
    await axios.delete(BOOKSTORE_API_BASE_URL + "/Delete/" + bookId);
}
// eslint-disable-next-line
export default new BookStoreServices();

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

  getBookById = async (bookId, token) =>
    await axios.get(BOOKSTORE_API_BASE_URL + "/Get/" + bookId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  updateBook = async (bookId, book, token) =>
    await axios.put(BOOKSTORE_API_BASE_URL + "/Update/" + bookId, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  deleteBook = async (bookId, token) =>
    await axios.delete(BOOKSTORE_API_BASE_URL + "/Delete/" + bookId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}
// eslint-disable-next-line
export default new BookStoreServices();

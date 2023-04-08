import React, {  useState } from "react";
import useBooks from "../../../hooks/useBooks";
import { useNavigate } from "react-router";
import { FormGroup, Input, Form, Container, Button } from "reactstrap";

const CreateBook = () => {
  let navigate = useNavigate();
  const { BookError, BookBo, createBook } = useBooks();

  const [bookBo, setBook] = useState(BookBo);

  const setBookName = (e) => {
    setBook({
      ...bookBo,
      name: e.target.value,
    });
  };
  const setTheWay = (e) => {
    setBook({
      ...bookBo,
      theWay: e.target.value,
    });
  };
  const setPrice = (e) => {
    setBook({
      ...bookBo,
      price: e.target.value,
    });
  };

  const AddBook = (e) => {
    e.preventDefault();
    createBook(bookBo);
  };

  const test = () => {
    console.log(bookBo);
  };
  return (
    <>
      <Container>
        <Button onClick={test}>test book obj </Button>
        <Form onSubmit={AddBook}>
          <FormGroup>
            <Input
              name="Book Name"
              placeholder="Book Name"
              type="text"
              onChange={setBookName}
              maxLength={50}
              required
              valid={bookBo.bookName ? true : false}
            />
          </FormGroup>

          <FormGroup>
            <FormGroup>
              <Input
                id="select_way"
                name="SelectTheWay"
                type="select"
                onChange={setTheWay}
                required
                defaultValue=""
                valid={bookBo.theWay ? true : false}
              >
                {
                  <option value="" disabled>
                    Choose the Way
                  </option>
                }

                {<option value="Exchange">Exchange</option>}
                {<option value="Sell">Sell</option>}
              </Input>
            </FormGroup>
            <Input
              name="Price"
              placeholder="Price"
              type="number"
              onChange={setPrice}
              maxLength={15}
              required
              valid={bookBo.price ? true : false}
              disabled={bookBo.theWay === "Exchange" ? true : false}
              value={
                bookBo.theWay === "Exchange" ? (bookBo.price = 0) : bookBo.price
              }
            />
          </FormGroup>
          <Button>add</Button>
        </Form>
        <Button onClick={() => navigate("/dashboard")}>go to dash</Button>
        {BookError && BookError}
      </Container>
    </>
  );
};

export default CreateBook;

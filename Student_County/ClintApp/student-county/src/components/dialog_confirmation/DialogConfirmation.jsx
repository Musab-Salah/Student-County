import useComponent from "../../hooks/useComponent";
import useBooks from "../../hooks/useBooks";
import "./DialogConfirmation.css";

const DialogConfirmation = ({ id }) => {
  const { setDeleteDialogState } = useComponent();

  const { deleteBook } = useBooks();

  const handleSubmit = (event) => {
    event.preventDefault();
    setDeleteDialogState("");
    deleteBook(id);
  };
  return (
    <>
      <div className="Create-section">
        <form className="form-create title" onSubmit={handleSubmit}>
          Are you sure to do this process?
          <div className="buttons">
            <button type="submit" className={`btn btn-primary `}>
              Yes
            </button>
            <button
              onClick={() => setDeleteDialogState("")}
              className={`btn btn-secondary `}
            >
              No
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DialogConfirmation;

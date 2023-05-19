import useBooks from "../../hooks/useBooks";
import "./DialogConfirmation.css";

const DialogConfirmation = ({ id ,setDeleteDialogState}) => {

  const { deleteBook } = useBooks();

  const handleSubmit = (event) => {
    event.preventDefault();
    setDeleteDialogState("");
    deleteBook(id);
  };
  return (
    <>
      <div className="Create-section-dialog">
        <form className="form-create-dialog title-dialog " onSubmit={handleSubmit}>
          Are you sure to do this process?
          <div className="buttons-dialog">
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

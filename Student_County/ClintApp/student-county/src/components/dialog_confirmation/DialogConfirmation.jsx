import useBooks from "../../hooks/useBooks";
import useHousings from "../../hooks/useHousings";
import usePatient from "../../hooks/usePatient";
import "./DialogConfirmation.css";
import useRides from "./../../hooks/useRides";
import useTools from "../../hooks/useTools";

const DialogConfirmation = ({ serviceName, id, setDeleteDialogState }) => {
  const { deleteBook } = useBooks();
  const { deleteTool } = useTools();
  const { deleteRide } = useRides();
  const { deleteHousing } = useHousings();
  const { deletePatient } = usePatient();

  const handleSubmit = (event) => {
    event.preventDefault();
    setDeleteDialogState("");
    if (serviceName === "Book") deleteBook(id);
    else if (serviceName === "Tools") deleteTool(id);
    else if (serviceName === "Housing") deleteHousing(id);
    else if (serviceName === "Ride") deleteRide(id);
    else if (serviceName === "Patient") deletePatient(id);
  };
  return (
    <>
      <div className="create-section-dialog">
        <form
          className="form-create-dialog title-dialog "
          onSubmit={handleSubmit}
        >
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

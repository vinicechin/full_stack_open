export function ContactForm({ handleOnAddClick }) {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  function handleOnNameChange(e) {
    setNewName(e.target.value);
  }

  function handleOnPhoneChange(e) {
    setNewPhone(e.target.value);
  }
  
  return (
    <form>
      <table>
        <tbody>
          <tr>
            <td>name</td>
            <td>
              <input value={newName} onChange={handleOnNameChange} />
            </td>
          </tr>
          <tr>
            <td>phone</td>
            <td>
              <input value={newPhone} onChange={handleOnPhoneChange} />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button
          disabled={newName.length === 0}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleOnAddClick(newName, newPhone);
          }}
        >
          add
        </button>
      </div>
    </form>
  );
}
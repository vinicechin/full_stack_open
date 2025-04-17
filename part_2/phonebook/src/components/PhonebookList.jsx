export function PhonebookList({ persons, handleOnDeleteClick }) {
  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.phone}</td>
            <td>
              <button onClick={() => {
                const confirmed = window.confirm(`Are you sure you want to delete contact for ${person.name}?`);
                if (confirmed) {
                  handleOnDeleteClick(person.id);
                }
              }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
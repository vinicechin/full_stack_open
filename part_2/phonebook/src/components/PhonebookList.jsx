export function PhonebookList({ persons }) {
  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
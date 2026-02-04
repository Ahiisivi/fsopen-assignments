  const Name = (props) => {
    return (
      <li>
        {props.name}, {props.number}
        <button onClick={props.deleteName}>Delete</button>
      </li>
    )
  }

export default Name
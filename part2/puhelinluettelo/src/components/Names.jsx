  const Name = (props) => {
    return (
      <li className="name">
        {props.name}, {props.number}
        <button onClick={props.deleteName}>Delete</button>
      </li>
    )
  }

export default Name
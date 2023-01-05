import React from 'react';

function ListItem (props) {

    return (
        // <>
        // {JSON.stringify(props.creature)}
        // </>
     <li>
        <button>delete me</button>
        {props.creature.name} is from {props.creature.origin}
        <button>click me</button>
     </li>
    )
}

export default ListItem;
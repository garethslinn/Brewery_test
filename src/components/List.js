import React from 'react';

const List = (props) => {
    const { list, getDetails } = props;
    return (
        <tbody data-testid="tableBody">
            { list &&
            list.map((item, index) => ( 
            <tr data-testid={'row-' + index }key={index} onClick={() => getDetails(item.id)}>
                <td>{ item.name }</td>
                <td>{ item.brewery_type }</td>
                <td>{ item.state }</td>
            </tr>
            ))
            }
      </tbody>
    )
}

export default List;
import React from 'react';

const List = (props) => {
    const { list, getDetails } = props;
    return (
        <tbody data-testid="tableBody">
            { list &&
            list.map((item, index) => ( 
            <tr data-testid={'row-' + index }key={index} onClick={() => getDetails(item.id)}>
                <td data-testid={'name-' + index}>{ item.name }</td>
                <td data-testid={'type-' + index}>{ item.brewery_type }</td>
                <td data-testid={'state-' + index}>{ item.state }</td>
            </tr>
            ))
            }
      </tbody>
    )
}

export default List;
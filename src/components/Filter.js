import React from 'react';
import { GLOBAL } from '../constants/global';

const Filter= (props) => {
    const { sortData, option, setToggle, toggle } = props;
    const { NAME, TYPE, STATE, FILTER_TITLE } = GLOBAL;

    return (
        <React.Fragment>
            <div className="dropdown">
                <button data-testid="dropdown-toggle" onClick={() => setToggle(true)} className="btn btn-secondary dropdown-toggle" type="button">
                    { FILTER_TITLE }
                </button>
                <div>Sorted by: <span data-testid="sort-name">{ option || 'none' } </span></div>
                { toggle && 
                    <div data-testid="dropdown-menu" className="dropdown-menu show" aria-labelledby="dropdownMenuButton">
                        <div data-testid="dropdown-name" onClick={() => sortData(NAME)} className="dropdown-item">{ NAME }</div>
                        <div data-testid="dropdown-type" onClick={() => sortData(TYPE)} className="dropdown-item">{ TYPE }</div>
                        <div data-testid="dropdown-state" onClick={() => sortData(STATE)} className="dropdown-item">{ STATE }</div>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export default Filter;
import React from 'react';
import { GLOBAL } from '../constants/global';

const Filter= (props) => {
    const { sortData, option, setToggle, toggle } = props;
    const { NAME, TYPE, STATE, FILTER_TITLE } = GLOBAL;

    return (
        <React.Fragment>
            <div className="dropdown">
                <button onClick={() => setToggle(true)} className="btn btn-secondary dropdown-toggle" type="button">
                    { FILTER_TITLE }
                </button>
                <div>Sorted by: <span>{ option || 'none' } </span></div>
                { toggle && 
                    <div className="dropdown-menu show"aria-labelledby="dropdownMenuButton">
                        <div onClick={() => sortData(NAME)} className="dropdown-item">{ NAME }</div>
                        <div onClick={() => sortData(TYPE)} className="dropdown-item">{ TYPE }</div>
                        <div onClick={() => sortData(STATE)} className="dropdown-item">{ STATE }</div>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export default Filter;
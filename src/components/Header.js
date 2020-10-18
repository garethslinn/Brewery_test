import React from 'react';
import { GLOBAL } from '../constants/global';

const Header = () => {
    const { NAME, TYPE, STATE } = GLOBAL;
    return (
        <thead>
            <tr>
                <td>{ NAME }</td>
                <td>{ TYPE }</td>
                <td>{ STATE }</td>
            </tr>
        </thead>
    )
}

export default Header;
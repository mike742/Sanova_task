import React, {useState} from 'react';

export default props => {
    const [value, setValue] = useState('')
    const onChangeHandler = event => {
        setValue(event.target.value);
    }
    
    return (
        <React.Fragment>
            <i className="fas fa-search" aria-hidden="true"></i>
            <input className="form-control form-control-sm mt-3 mb-3" 
                type="text" 
                placeholder="Search"
                value={value} 
                onChange={onChangeHandler}
                onKeyUp={() => props.onFilter(value)} />
        </React.Fragment>
    )
}
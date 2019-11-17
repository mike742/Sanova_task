import React from 'react';

export default props => (
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'name')}>
                    Name {props.sortedColumn === 'name' ? <small>{props.sortDirect}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'model')}>
                    Model {props.sortedColumn === 'model' ? <small>{props.sortDirect}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'color')}>
                    Color {props.sortedColumn === 'color' ? <small>{props.sortDirect}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'engine')}>
                    Engine {props.sortedColumn === 'engine' ? <small>{props.sortDirect}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'mileage')}>
                    Mileage {props.sortedColumn === 'mileage' ? <small>{props.sortDirect}</small> : null}
                </th>
            </tr>
        </thead>
        <tbody>
            {props.data.map((item, i) => (
                <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.model}</td>
                    <td>{item.color}</td>
                    {/* 
                        this is the comparison implemented for the engine-field:
                        "8 cyclinders while not in test mode otherwise 2 bicycle pedals"
                        which could be considered as a task
                     */}
                    <td>{ process.env.NODE_ENV !== 'test' 
                            && item.engine.indexOf('while') !== -1 
                          ? item.engine.substring(0, item.engine.indexOf('while')) 
                          : item.engine.indexOf('otherwise') !== -1 
                          ? item.engine.substring(item.engine.indexOf('otherwise') + 'otherwise'.length)
                          : item.engine
                        }</td>
                    <td>{item.mileage}</td>
                </tr>
            ))}
        </tbody>
    </table>
);
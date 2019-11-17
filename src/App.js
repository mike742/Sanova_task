import React, { Component } from 'react';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import _ from 'lodash';
import Filter from './Filter/Filter';

class App extends Component {

  state = {
    isLoading: true,
    data: [],
    sortDirect: 'asc',
    sortedColumn: 'name',
    filter: ''
  };

  async componentDidMount() {
    const response = await fetch('https://mobiledev.sunovacu.ca/api/Test/GetCars');
    let data = await response.json();

    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortedColumn, this.state.sortDirect)
    });
  }

  onSortHandler = sortedColumn => {
    const clonedData = this.state.data.concat();
    const sortDirect = this.state.sortDirect === 'asc' ? 'desc' : 'asc';
    const data = _.orderBy(clonedData, sortedColumn, sortDirect);
    this.setState({ data, sortDirect, sortedColumn });
  }

  onFilterHandler = filter => {
    //console.log(filter); 
    this.setState({filter});
  }

  getFilteredData () {
    const {data, filter} = this.state;

    if(filter === '') return data;

    return data.filter(item => {
      return  item['name'].toLowerCase().includes(filter.toLowerCase())
           || item['model'].toLowerCase().includes(filter.toLowerCase())
           || item['color'].toLowerCase().includes(filter.toLowerCase())
           || item['engine'].toLowerCase().includes(filter.toLowerCase())
           || item['mileage'].toString().includes(filter.toString())
    }); 
  }

  render() {
    const filteredData = this.getFilteredData();

    return (
      <div className="container">
        {
          this.state.isLoading ? <Loader></Loader>
            : <React.Fragment>
              <Filter onFilter={this.onFilterHandler}></Filter>
              <Table
                data={filteredData}
                onSort={this.onSortHandler}
                sortDirect={this.state.sortDirect}
                sortedColumn={this.state.sortedColumn}></Table>
            </React.Fragment>
        }
      </div>
    );
  }
}

export default App;

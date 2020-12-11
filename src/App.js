import React, { useState } from 'react'
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import './index.css'
import data from './jsonData'
import {addWatchedRepo, removeWatchedRepo, checkForUpdates, confirmUpdate} from './app/Funcs.js'
import deleteIcon from './icons/delete-button-svgrepo-com.svg'
import refreshIcon from './icons/refresh.png'
import checkIcon from './icons/check.png'

class AddRepoForm extends React.Component {
  state = {
    value: "",
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    if (this.state.value.length <= 0) {
      alert("Please enter a valid Repository");
    } else {
      addWatchedRepo(this.state.value);
    }
  };
  render() {
    const {value} = this.state;
    return (
      <div>
        <h3>Add a GitHub Repository</h3>
        <form onSubmit={this.handleSearch}>
          <input
            placeholder="facebook/react ⌕"
            type="text"
            value={value}
            onChange={this.handleInputChange}
          />
        </form>
      </div>
    );
  }
}

const App = () => {
  const [caseSensivite] = useState(false)
  const [sortable] = useState(true)
  const [filterable] = useState(true)
  const additionalCols = [
    {
      header: 'Actions',
      td: (data) => {
        return (
          <div>
            <img
              src={deleteIcon}
              alt='delete'
              width='30'
              height='20'
              onClick={() => removeWatchedRepo(data.url)}
            />
            <img
              src={refreshIcon}
              alt='checkForUpdate'
              width='30'
              height='20'
              onClick={() => checkForUpdates()}
            />
            <img
              src={checkIcon}
              alt='confirmUpdate'
              width='30'
              height='20'
              onClick={() => confirmUpdate(data.url)}
            />
          </div>
        )
      }
    }
  ]
  return (
    <div style={{ margin: '30px' }}>
      <h2 style={{ textAlign: 'center' }}>Git Repo Tracker</h2>
      <ReactFlexyTable
        data={data}
        sortable={sortable}
        filterable={filterable}
        caseSensitive={caseSensivite}
        additionalCols={additionalCols}
        globalSearch
      />
      <AddRepoForm/>
    </div>
  )
}

export default App

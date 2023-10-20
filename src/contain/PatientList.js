import React, { Component } from "react";
import { NavLink, Link } from 'react-router-dom';
import { Table, Input, Pagination  } from 'antd';
import Papa from 'papaparse';
//import 'antd/dist/antd.css';
import './../Css/PatientList.css';
import './../Css/BreadcrumbBar.css';
import datas from './patient.csv';


const { Search } = Input;

const columns = [
  {
    title: '病患編號',
    dataIndex: 'stay_id',
    key: 'stay_id',
    width: 350,
    align: 'center',
    render: text => <div className="column-cell">{text}</div>,
  },
  {
    title: '性別',
    dataIndex: 'gender',
    key: 'gender',
    width: 300,
    align: 'center',
    render: text => <div className="column-cell">{text}</div>,
  },
  {
    title: '年齡',
    dataIndex: 'age',
    key: 'age',
    width: 300,
    align: 'center',
    render: text => <div className="column-cell">{text}</div>,
  },
  {
    title: '詳細資料',
    key: 'details',
    width: 300,
    align: 'center',
    render: (text, record) => (
      <div className="column-cell">
        <Link to={`/PatientDetails/${record.stay_id}/PredictAndData`}>詳細</Link>
      </div>
    ),
  },
];

class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      originalData: [],
      filteredData: [],
    };
  }

  componentDidMount() {
    this.loadDataFromCsv();
  }

  loadDataFromCsv = () => {
    Papa.parse(datas, {
      download: true,
      delimiter: ',',
      complete: ((result) => {
        //console.log('Parsed CSV Data:', result.data);
        var keys = result.data[0]; // 列名作为键
        var dictList = [];
        var listCunt = 0;
        for (var i = 1; i < result.data.length - 1; i++) {
            //if (listCunt === 1) {
            //    console.log('Parsed CSV Data:', dictList[0]);
            //}
            if (listCunt !== 0 && dictList[listCunt - 1][keys[0]] === result.data[i][0]) {
                continue;
            }
            var dict = {};
            for (var j = 0; j < keys.length; j++) {
                dict[keys[j]] = result.data[i][j]; // 使用列名作为键，对应数据作为值
            }
            dictList.push(dict);
            listCunt++;
        }
        //console.log('Parsed CSV Data:', dictList);
        this.setState({
          originalData: dictList,
          filteredData: dictList,
        });
      }),
      error: error => {
        console.error('Error parsing CSV:', error);
      },
    });
  };

  handleSearch = value => {
    const filtered = this.state.originalData.filter(patient =>
      patient.stay_id.includes(value)
    );
    this.setState({
      searchText: value,
      filteredData: filtered,
    });
  };

  render() {
    return (
      <div className="patient-list">
        <div className="breadcrumb">
            <span>
              <Link to="/Home">首頁</Link>
            </span>
            <span>
              {' > '}
              <Link to="/PatientList">病患列表</Link>
            </span>
        </div>

        <div className="table-search-container">
            <div className="search-container">
              <div className="search-details-container">
                <Search
                  placeholder="搜尋病患編號"
                  value={this.state.searchText}
                  onChange={e => this.handleSearch(e.target.value)}
                  onSearch={this.handleSearch}
                  style={{ width: 200 }}
                />
              </div>
            </div>
            <div className="table-container">
                <Table
                  columns={columns}
                  dataSource={this.state.filteredData}
                  rowKey="stay_id"
                  pagination={{
                    pageSize: 8,
                    showSizeChanger: false,
                    style: {
                      display: 'flex',
                      justifyContent: 'center', // 分页按钮水平居中
                      alignItems: 'flex-end', // 分页按钮在底部
                      position: 'absolute',
                      width: '100%',
                      textAlign: 'center'
                    },
                  }}
                />
            </div>
        </div>

      </div>
    );
  }
}

export default PatientList;

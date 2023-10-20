import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useParams } from 'react-router-dom';
import { Table, Select } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Papa from 'papaparse';
import './../Css/PatientDetails.css';
import data_static from './data_static.csv';
import data_dynamic from './data_dynamic.csv';


const columnsToExclude = ['stay_id', 'date', 'gender', 'age', 'race'];
let staticKeys = [];
let dynamicKeys = [];
let staticPatientData = [];
let dynamicPatientData = [];

const loadDataFromCsv = (stayId, datas) => {
  return new Promise((resolve, reject) => {
    Papa.parse(datas, {
      download: true,
      delimiter: ',',
      complete: (result) => {
        //console.log('Parsed CSV Data:', result.data);
        var keys = result.data[0];
        //setAllColumns(keys.filter((column) => !columnsToExclude.includes(column))); // 去掉 stay_id 列，保留其它列
        var dictList = [];
        var listCunt = 0;
        for (var i = 1; i < result.data.length - 1; i++) {
            if (listCunt !== 0 && result.data[i][0] !== stayId) {
                break;
            }
            else if (result.data[i][0] === stayId) {
                var dict = {};
                for (var j = 0; j < keys.length; j++) {
                  dict[keys[j]] = result.data[i][j];
                }
                dictList.push(dict);
                listCunt++;
            }
        }
        resolve({ keys, dictList });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

const PatientDetails = () => {
  const { stayId } = useParams();
  return (
    <div className="patient-detail">
      <div className="breadcrumb">
        <span>
          <Link to="/Home">首頁</Link>
        </span>
        <span>
          {' > '}
          <Link to="/PatientList">病患列表</Link>
        </span>
        <span>
          {' > '}
          <Link to={`/PatientDetails/${stayId}/Predict`}>病患{stayId}</Link>
        </span>
      </div>
      <div className="app">
        <div className="main-wrap">
          <nav className="nav">
            <h1 className="logo">病患詳細資料&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
            <h2>{stayId}</h2>
            <ul className="nav-list">
              <li><NavLink to="PredictAndData">基本資料、預測結果</NavLink></li>
              <li><NavLink to="StaticAndDynamicData">動、靜態數據篩選</NavLink></li>
            </ul>
          </nav>
          <main className="main">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
              /*<li><NavLink to="Predict">基本資料、預測結果</NavLink></li>
              <li><NavLink to="Data">基本資料</NavLink></li>
              <li><NavLink to="StaticData">靜態數據</NavLink></li>
              <li><NavLink to="DynamicData">動態數據</NavLink></li>*/

const Predict = () => {
  const { stayId } = useParams();
  const imagePath = `${stayId}.png`;
  return (
    <div>
      <img src={require('./../Css/picture/' + imagePath)} alt="Stay Image" />
    </div>
  );
};

const Data = () => {
  const { stayId } = useParams();
  const [patientData, setPatientData] = useState([]);
  const allColumns = ['stay_id', 'gender', 'age', 'race']; // 保存所有列

  useEffect(() => {
    const fetchData = async () => {
        try {
          const { dictList } = await loadDataFromCsv(stayId, data_static);
          setPatientData(dictList[0]);
          staticPatientData = dictList;
        } catch (error) {
          console.error('Error loading data:', error);
        }
    };

    if (staticPatientData.length === 0 || stayId !== staticPatientData[0].stay_id) {
      fetchData();
    } else {
      //console.log('4644546446 :: ', staticPatientData[0].stay_id);
      setPatientData(staticPatientData[0]);
    }
  }, [stayId]);

  const columns = [
    {
      title: '基本資料',
      dataIndex: 'item',
      key: 'item',
      align: 'center',
    },
    {

      dataIndex: 'value',
      key: 'value',
      align: 'center',
      render: (text) => <div className="column-cell">{text}</div>,
    },
  ];

  let dataSource = []; // 初始化 dataSource

  for (var i = 0; i <= 3; i++) {
    dataSource.push({
      key: allColumns[i],
      item: allColumns[i],
      value: patientData[allColumns[i]],
    })
  };

  return (
    <div>
      {dataSource[0].value ? (
        //console.log('4644546446 :: ', dataSource),
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const PredictAndData = () => {
  // 这个组件会合并StaticData和DynamicData，左侧显示StaticData，右侧显示DynamicData
  return (
    <div>
      <Predict />
      <Data />
    </div>
  );
};

const StaticData = () => {
  const { stayId } = useParams();
  const [patientData, setPatientData] = useState([]);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]); // 保存选中的列
  const [allColumns, setAllColumns] = useState([]); // 保存所有列
  const [isSelectOpen, setIsSelectOpen] = useState(false); // 是否打开下拉框

  useEffect(() => {
    const fetchData = async () => {
        try {
          const { keys, dictList } = await loadDataFromCsv(stayId, data_static);
          console.log('4644546446 :: ', keys);
          setAllColumns(keys.filter((column) => !columnsToExclude.includes(column)));
          setPatientData(dictList);

          staticKeys = keys.filter((column) => !columnsToExclude.includes(column));
          staticPatientData = dictList;
        } catch (error) {
          console.error('Error loading data:', error);
        }
    };
    if (staticKeys.length === 0 || staticPatientData.length === 0 || stayId !== staticPatientData[0].stay_id) {
      fetchData();
    } else {
      //console.log('4644546446 :: ', staticPatientData[0].stay_id);
      setAllColumns(staticKeys);
      setPatientData(staticPatientData);
    }
  }, [stayId]);

  useEffect(() => {
    if (patientData.length > 0) {
      const selectedData = patientData[0];
      //console.log('4644546446 :: ', selectedData);
      setSelectedPatientData(selectedData);
      setSelectedColumns(['dnr']); // 默认不选择任何列
    }
  }, [patientData, stayId]);

  const handleSelectOpen = (open) => {
    setIsSelectOpen(open);
  };

  const handleClearSelection = () => {
    setSelectedColumns(['dnr']); // 清空已选中的列
  };

  const columns = [
    {
      title: (
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="選擇要顯示的數據項目"
          value={selectedColumns}
          open={isSelectOpen}
          onDropdownVisibleChange={handleSelectOpen}
          onChange={setSelectedColumns}
          maxTagCount={1}
          maxTagPlaceholder={(omittedValues) => `另外 ${omittedValues.length} 項`}
          suffixIcon={<CloseCircleOutlined onClick={handleClearSelection} />}
        >
          {allColumns.map((column) => (
            <Select.Option key={column} value={column}>
              {column}
            </Select.Option>
          ))}
        </Select>
      ),
      dataIndex: 'item',
      key: 'item',
      align: 'center',
    },
    {
      title: '靜態數值',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      render: (text) => <div className="column-cell">{text}</div>,
    },
  ];

  let dataSource = []; // 初始化 dataSource

  if (selectedPatientData) {
      // 仅选择被用户选中的列
      dataSource = selectedColumns.map((column) => ({
        key: column,
        item: column,
        value: selectedPatientData[column],
      }));
  }

  return (
    <div className="StaticData">
      {selectedPatientData ? (
        //console.log('4644546446 :: ', dataSource),
        <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ y: 460 }} />
      ) : (
        <Table scroll={{ y: 460 }} />
      )}
    </div>
  );
};

const DynamicData = () => {
  const { stayId } = useParams();
  const [patientData, setPatientData] = useState([]);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]); // 保存选中的列
  const [selectedColumn, setSelectedColumn] = useState([]); // 保存选中的列
  const [allColumns, setAllColumns] = useState([]); // 保存所有列
  const [isSelectOpen, setIsSelectOpen] = useState(false); // 是否打开下拉框
  const [showTrendChart, setShowTrendChart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const { keys, dictList } = await loadDataFromCsv(stayId, data_dynamic);

          setAllColumns(keys.filter((column) => !columnsToExclude.includes(column)));
          setPatientData(dictList);

          dynamicKeys = keys.filter((column) => !columnsToExclude.includes(column));
          dynamicPatientData = dictList;
        } catch (error) {
          console.error('Error loading data:', error);
        }
    };
    if (dynamicKeys.length === 0 || dynamicPatientData.length === 0 || stayId !== dynamicPatientData[0].stay_id) {
      fetchData();
    } else {
      //console.log('4644546446 :: ', dynamicPatientData[0].stay_id);
      setAllColumns(dynamicKeys);
      setPatientData(dynamicPatientData);
    }
  }, [stayId]);

  useEffect(() => {
    const handlePageClick = (event) => {
        if (showTrendChart) {
          // 检查点击的目标是否在趋势图容器之内
          const chartContainer = document.getElementById('chart-container');
          const chartBackground = document.getElementById('chart_background');
          if (!chartContainer.contains(event.target) && chartBackground.contains(event.target)) {
            // 点击了趋势图之外的区域，关闭趋势图
            setShowTrendChart(!showTrendChart);
          }
        }
    };
    document.addEventListener('click', handlePageClick);
    return () => {
      document.removeEventListener('click', handlePageClick);
    };
  }, [showTrendChart, patientData, stayId]);


  useEffect(() => {
    if (patientData.length > 0) {
      const selectedData = patientData.find((data) => data.stay_id === stayId);
      setSelectedPatientData(selectedData);
      //console.log('4644546446 :: ', selectedData);
      setSelectedColumns(['Heart Rate']); // 默认不选择任何列
    };
  }, [patientData, stayId]);

  const handleSelectOpen = (open) => {
    setIsSelectOpen(open);
  };

  const handleClearSelection = () => {
    setSelectedColumns(['Heart Rate']); // 清空已选中的列
  };

  const toggleTrendChart = (column) => {
    setSelectedColumn(column); // 设置选中的列
    //console.log('4644546446 :: ', showTrendChart);
    if (showTrendChart === false) {
      setShowTrendChart(!showTrendChart);
    }
  };

  const chartData = {
    categories: [], // 存放日期
    value: [], // 存放选定列的值
  };

  if (toggleTrendChart) {
    patientData.forEach((patient) => {
      const date = patient.date; // 日期字段
      const columnValue = patient[selectedColumn]; // 选定列的值

      chartData.categories.push(date);
      chartData.value.push(parseInt(columnValue));
    });
  }

  const chartOptions = {
    credits:{
      enabled: false // 禁用版权信息
    },
    title: { text: `${selectedColumn} 變化趨勢圖` },
    xAxis: {
      categories: chartData.categories, // x 轴为日期
    },
    yAxis: {
      title: { text: '' },
    },
    series: [
      {
        name: selectedColumn,
        data: chartData.value, // y 轴数据
      },
    ],
    chart: {
      type: 'line',
      width: 700,
      height: 450,
      borderWidth: 1,
      borderColor: '#004B97',
      borderRadius: 10, // 添加圆角
      backgroundColor: '#FDFFFF', // 设置背景颜色为淡蓝色
    }
  };

  const columns = [
    {
      title: (
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="選擇要顯示的數據項目"
          value={selectedColumns}
          open={isSelectOpen}
          onDropdownVisibleChange={handleSelectOpen}
          onChange={setSelectedColumns}
          maxTagCount={1}
          maxTagPlaceholder={(omittedValues) => `另外 ${omittedValues.length} 項`}
          suffixIcon={<CloseCircleOutlined onClick={handleClearSelection} />}
        >
          {allColumns.map((column) => (
            <Select.Option key={column} value={column}>
              {column}
            </Select.Option>
          ))}
        </Select>
      ),
      dataIndex: 'item',
      key: 'item',
      align: 'center',
    },
    //{
    //    title: '數值',
    //    dataIndex: 'value',
    //    key: 'value',
    //    align: 'center',
    //    render: (text) => <div className="column-cell">{text}</div>,
    //},
    {
        title: '動態趨勢圖',
        key: 'details',
        //width: 300,
        align: 'center',
        render: (text, record) => (
          <div className="column-cell">
          <button onClick={() => toggleTrendChart(record.item)}>趨勢圖</button>
        </div>
        ),
    },
  ];

  let dataSource = []; // 初始化 dataSource

  if (selectedPatientData) {
      // 仅选择被用户选中的列
      dataSource = selectedColumns.map((column) => ({
        key: column,
        item: column,
        value: selectedPatientData[column],
      }));
  }

  const chartContainerStyle = {
    display: showTrendChart ? 'block' : 'none',
  };

  return (
      <div className="DynamicData">
        <div id="chart-container" class="chartContainerStyle" style={chartContainerStyle}>
          {showTrendChart && (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          )}
        </div>
        {showTrendChart && (
            <div id="chart_background" class="chartBackground"/>
        )}
        {selectedPatientData ? (
          <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ y: 460 }} />
        ) : (
          <Table scroll={{ y: 460 }} />
        )}
      </div>
  );
};

const StaticAndDynamicData = () => {
  // 这个组件会合并StaticData和DynamicData，左侧显示StaticData，右侧显示DynamicData
  return (
    <div className="combined-data">
      <StaticData />
      <DynamicData />
    </div>
  );
};

export { PatientDetails, Predict, Data, PredictAndData, StaticData, DynamicData, StaticAndDynamicData };
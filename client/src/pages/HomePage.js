import React,{useState,useEffect} from 'react';
import {  Form, Input,  Modal, Select, Table, message,DatePicker } from 'antd';
import {UnorderedListOutlined,AreaChartOutlined} from '@ant-design/icons'
import Layout from '../components/Layout/Layout';
import Spinner from '../components/Layout/Spinner';
import axios from 'axios';
import moment from 'moment';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;
const HomePage = () => {
  const [showModal,setShowModal]=useState(false);
  const [loading,setloading]=useState(false);
  const [allTransection,setAllTransection]=useState([]);
  const [frequency,setFrequency]=useState('7')
  const[selectedDate,setSelecteddate]=useState([]);
  const [type,setType]=useState('all');
  const [viewData,setViewData]=useState('table')
   
  //table data
  const columns=[
    {
      title:'Date',
      dataIndex:'date',
      render:(text)=><span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title:'Amount',
      dataIndex:'amount'
    },
    
    {
      title:'Type',
      dataIndex:'type'
    },
    {
      title:'Category',
      dataIndex:'category'
    },
    {
      title:'Refrence',
      dataIndex:'refrence'
    },
    {
      title:'Actions',
      
    },
  ];

  
  useEffect(()=>{
    //getall transections
  const getAllTransections=async ()=>{
    try {
      const user=JSON.parse(localStorage.getItem('user'));
      setloading(true);
      const res=await axios.post('/transections/get-transections',{userid:user._id,frequency,selectedDate,type});
      setloading(false)
      setAllTransection(res.data) 
      console.log(res.data)
      
    } catch (error) {
      console.log(error);
      message.error('Fetch issues with transection');
    }
  };
    getAllTransections();
  },[frequency,selectedDate,type]);
  const handleSubmit=async(values) => {
    try{
      const user=JSON.parse(localStorage.getItem('user'))
      setloading(true);
      await axios.post('/transections/add-transection',{...values,userid:user._id})
      setloading(false)
      message.success('Transection Added Succesfully');
      setShowModal(false);
    }catch(error)
    {
      setloading(false)
      message.error('Failed to add transection')
    }
    
  }
  return (
    <Layout>  
    {/* //Using component as a Html element */}
    {loading && <Spinner/>}
        <div className="filters">
          <div>
            <h6>Select frequency</h6>
            <Select value={frequency} onChange={(values)=>setFrequency(values)}>
              <Select.Option value="7">Last 1 week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency==='custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelecteddate(values)}/>}
          </div>
          <div>
            <h6>Select Type</h6>
            <Select value={type} onChange={(values)=>setType(values)}>
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
        
            </Select>
            {frequency==='custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelecteddate(values)}/>}
          </div>
          <div className="switch-icons">
          <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' :'inactive-icon'}`} onClick={()=> setViewData("table")} />
          <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' :'inactive-icon'}`} onClick={()=> setViewData("analytics")}/>
          

          </div>
          <div>
         
            <button className="btn btn-primary" onClick={()=>setShowModal(true)}> Add new</button>
          </div>
        </div>
        <div className="content">
         {viewData === 'table' ? <Table columns={columns}   dataSource={allTransection}/>
         :<Analytics allTransection={allTransection}/>
         }
          
        </div>
        <Modal
        title="Add transaction"
        open={showModal}
        onCancel={()=>setShowModal(false)}
        footer={false}
        >
      <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Amount"  name="amount">
        <Input type="text"/>
      </Form.Item>
      <Form.Item label="type" name="type">
        <Select>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="Expense">Expense</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Category" name="category">
        <Select>
          <Select.Option value="salary">Salary</Select.Option>
          <Select.Option value="tip">Tip</Select.Option>
          <Select.Option value="project">Project</Select.Option>
          <Select.Option value="food">Food</Select.Option>
          <Select.Option value="movie">Movie</Select.Option>
          <Select.Option value="bills">Bills</Select.Option>
          <Select.Option value="medical">Medical</Select.Option>
          <Select.Option value="fee">Fee</Select.Option>
          <Select.Option value="tax">Tax</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Date" name="date">
        <Input type="date"/>
      </Form.Item>
      <Form.Item label="Refrence" name="refrence">
        <Input type="text"/>
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input type="text"/>
      </Form.Item>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          SAVE
        </button>
      </div>
      </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage
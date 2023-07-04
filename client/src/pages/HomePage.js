import React,{useState} from 'react';
import {  Form, Input,  Modal, Select } from 'antd';
import Layout from '../components/Layout/Layout'

const HomePage = () => {
  const [showModal,setShowModal]=useState(false);
  const handleSubmit=(values) => {
    console.log(values);
  }
  return (
    <Layout>  
    {/* //Using component as a Html element */}
        <div className="filters">
          <div>range filters</div>
          <div>
            <button className="btn btn-primary" onClick={()=>setShowModal(true)}> Add new</button>
          </div>
        </div>
        <div className="content"></div>
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
      <Form.Item label="Reference" name="reference">
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
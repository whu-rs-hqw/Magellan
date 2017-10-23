import React, { Component } from 'react';
import { Form, Modal, Cascader } from 'antd';
import axios from 'axios';
const { Item } = Form;
import { formItemLayout } from '../utils/layout';

class Dialog extends Component {
  state = {
    labs: [],
    seats: []
  }

  componentDidMount() {
    axios.get('/api/lab', { params: { currentPage: 1, pageSize: 1000 } })
      .then((res) => this.setState({ labs: res.data.list }));
    axios.get('/api/seat', { params: { currentPage: 1, pageSize: 1000 } })
    .then((res) => this.setState({ seats: res.data.list }));
  }

  handleLinkToEntity = e => {
    const { form, handleCloseModal, addProperty } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const type = values['type-id'][0];
        const id = values['type-id'][1];
        const name = this.state[`${type}s`].find(item => item.id === id).name;
        addProperty({ key: 'type', value: type });
        addProperty({ key: 'id', value: id });
        addProperty({ key: 'name', value: name });
        handleCloseModal();
      }
    });
  }

  render() {
    const { visible, handleCloseModal } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { labs, seats } = this.state;
    const options = [{
      value: 'lab',
      label: '机房',
      children: labs.map(lab => ({ value: lab.id, label: lab.name }))
    }, {
      value: 'seat',
      label: '机位',
      children: seats.map(lab => ({ value: lab.id, label: lab.name }))
    }];

    return <Modal
      title="Link to entity"
      visible={visible}
      onOk={this.handleLinkToEntity}
      onCancel={handleCloseModal}
    >
      <Form>
        <Item {...formItemLayout}
          label="entity"
        >
          {getFieldDecorator('type-id', {
            rules: [
              { required: true, message: 'Please select a entity.' }
            ]
          })(
            <Cascader options={options}/>
          )}
        </Item>
      </Form>
    </Modal>;
  }
}

export default Form.create()(Dialog);


import React, { Component } from 'react';
import { Form, Input, Modal } from 'antd';
const { Item } = Form;
import { formItemLayout } from '../utils/layout';

class Dialog extends Component {
  handleAddProperty = e => {
    const { form, handleCloseModal, addProperty } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        addProperty(values);
        handleCloseModal();
      }
    });
  }

  render() {
    const { visible, handleCloseModal } = this.props;
    const { getFieldDecorator } = this.props.form;

    return <Modal
      title="Add custom property"
      visible={visible}
      onOk={this.handleAddProperty}
      onCancel={handleCloseModal}
    >
      <Form>
        <Item {...formItemLayout}
          label="key"
        >
          {getFieldDecorator('key', {
            rules: [
              { required: true, message: 'Key of the property is required.' }
            ]
          })(
            <Input />
          )}
        </Item>
        <Item {...formItemLayout}
          label="value"
        >
          {getFieldDecorator('value', {
            rules: [
              { required: true, message: 'Value of the property is required.' }
            ]
          })(
            <Input />
          )}
        </Item>
      </Form>
    </Modal>;
  }
}

export default Form.create()(Dialog);


import React, { useState } from "react";
import { Button, Card, Modal, Select, Input, Form, Table, Typography } from "antd";
import "antd/dist/reset.css";
const InputField = ({ label, type, value, onChange }) => (
  <Form.Item label={label}>
    <Input type={type} value={value} onChange={onChange} />
  </Form.Item>
);

export default InputField
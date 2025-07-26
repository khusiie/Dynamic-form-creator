import React from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Upload,
  Checkbox,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;

export default function FormField({ field, value, onChange, error }) {
  const handleUpload = async (file) => {
    if (!field.data?.url) {
      message.error("Upload URL not configured");
      return false;
    }

    const { url, method = "POST", headers = {} } = field.data;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      const uploadedUrl = result.url || "";
      if (uploadedUrl) {
        onChange(uploadedUrl);
        message.success("File uploaded successfully");
      }
    } catch (err) {
      console.error(err);
      message.error("File upload failed");
    }

    return false; 
  };

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
        return (
          <Input
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "number":
        return (
          <InputNumber
            style={{ width: "100%" }}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
            value={value}
            onChange={(val) => onChange(val)}
          />
        );

      case "date":
        return (
          <DatePicker
            style={{ width: "100%" }}
            placeholder={field.placeholder}
            value={value ? dayjs(value) : null}
            onChange={(date) => onChange(date ? date.format("YYYY-MM-DD") : "")}
          />
        );

      case "datetime":
        return (
          <DatePicker
            style={{ width: "100%" }}
            showTime
            placeholder={field.placeholder}
            value={value ? dayjs(value) : null}
            onChange={(date) =>
              onChange(date ? date.toISOString() : "")
            }
          />
        );

      case "textarea":
        return (
          <TextArea
            rows={4}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "select":
        return (
          <Select
            placeholder={field.placeholder || "Select..."}
            value={value}
            onChange={(val) => onChange(val)}
            options={field.data.map((opt) => ({
              label: opt.title,
              value: opt.id,
            }))}
          />
        );

      case "multiselect":
        return (
          <Checkbox.Group
            value={value}
            onChange={(checkedValues) => onChange(checkedValues)}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {field.data.map((opt) => (
                <Checkbox key={opt.id} value={opt.id}>
                  {opt.title}
                </Checkbox>
              ))}
            </div>
          </Checkbox.Group>
        );

      case "file":
        return (
          <>
            <Upload
              beforeUpload={handleUpload}
              showUploadList={false}
              maxCount={1}
            >
              <Input
                readOnly
                value={value}
                addonAfter={<UploadOutlined />}
                placeholder="Upload file..."
              />
            </Upload>
          </>
        );

      default:
        return (
          <span style={{ color: "red" }}>
            Unsupported field type: {field.type}
          </span>
        );
    }
  };

  return (
    <Form.Item
      label={
        <>
          {field.title}
          {field.required && <span style={{ color: "red" }}> *</span>}
        </>
      }
      validateStatus={error ? "error" : ""}
      help={error}
    >
      {renderField()}
    </Form.Item>
  );
}

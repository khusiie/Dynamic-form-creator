import React, { useState, useEffect } from "react";
import { notification } from "antd";

import {
  Form,
  Button,
  Card,
  Typography,
  Divider,
  Space,
} from "antd";
import {
  FormOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import FormField from "./FormField";
import CardField from "./CardField";

const { Title, Text } = Typography;

export default function DynamicForm({ schema }) {
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const initial = {};
    schema.forEach((field) => {
      if (field.type === "card") {
        const cardValues = {};
        field.data.forEach((child) => {
          cardValues[child.name] = child.value || "";
        });
        initial[field.name] = cardValues;
      } else if (field.type === "multiselect") {
        initial[field.name] = field.value || [];
      } else {
        initial[field.name] = field.value || "";
      }
    });
    setFormData(initial);
    form.setFieldsValue(initial);
  }, [schema, form]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateMinMax = (field, value) => {
    if (field.type === "number") {
      const numVal = Number(value);
      if (field.min !== undefined && numVal < Number(field.min)) {
        return `Value must be ≥ ${field.min}`;
      }
      if (field.max !== undefined && numVal > Number(field.max)) {
        return `Value must be ≤ ${field.max}`;
      }
    } else if (field.type === "date" || field.type === "datetime") {
      const valDate = new Date(value);
      if (field.min && valDate < new Date(field.min)) {
        return `Date must be on or after ${field.min}`;
      }
      if (field.max && valDate > new Date(field.max)) {
        return `Date must be on or before ${field.max}`;
      }
    }
    return null;
  };

  const validate = () => {
    const newErrors = {};

    schema.forEach((field) => {
      const value = formData[field.name];

      if (field.type === "card") {
        const cardErrors = {};
        field.data.forEach((child) => {
          const val = (value || {})[child.name];
          if (
            child.required &&
            (val === undefined || val === "" || val === null || (Array.isArray(val) && val.length === 0))
          ) {
            cardErrors[child.name] = child.error || "This field is required.";
          } else if (child.validator && val) {
            const regex = new RegExp(child.validator);
            if (!regex.test(val)) {
              cardErrors[child.name] = child.error || "Invalid format.";
            }
          }
          const minMaxError = validateMinMax(child, val);
          if (minMaxError) {
            cardErrors[child.name] = minMaxError;
          }
        });
        if (Object.keys(cardErrors).length > 0) {
          newErrors[field.name] = cardErrors;
        }
      } else {
        if (
          field.required &&
          (value === undefined || value === "" || value === null || (Array.isArray(value) && value.length === 0))
        ) {
          newErrors[field.name] = field.error || "This field is required";
        } else if (field.validator && value) {
          const regex = new RegExp(field.validator);
          if (!regex.test(value)) {
            newErrors[field.name] = field.error || "Invalid format";
          }
        }
        const minMaxError = validateMinMax(field, value);
        if (minMaxError) {
          newErrors[field.name] = minMaxError;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
       console.log("handleSubmit triggered");
    if (validate()) {
      setLoading(true);
      notification.success({
        message: "Success",
        description: "Form submitted successfully!",
        placement: "topRight",
      });
      setSubmittedData(formData);
      console.log("Form Data:", formData);
      setLoading(false);
    } else {
      notification.error({
        message: "Error",
        description: "Please fix the errors in the form.",
        placement: "topRight",
      });
    }
  };

  return (
    <Card
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 24,
        borderRadius: 16,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
      title={
        <Space align="center">
          <FormOutlined style={{ fontSize: 24 }} />
          <Title level={3} style={{ margin: 0 }}>
            Dynamic Form Creator
          </Title>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
        // Removed onFinish prop to avoid conflict with custom validation
      >
        {schema.map((field) => {
          const defaultValue = (() => {
            if (field.type === "multiselect") return formData[field.name] || [];
            if (field.type === "card") return formData[field.name] || {};
            return formData[field.name] || "";
          })();

          return field.type === "card" ? (
            <CardField
              key={field.name}
              field={field}
              value={defaultValue}
              onChange={(val) => handleChange(field.name, val)}
              errors={errors[field.name] || {}}
            />
          ) : (
            <FormField
              key={field.name}
              field={field}
              value={defaultValue}
              onChange={(val) => handleChange(field.name, val)}
              error={errors[field.name]}
            />
          );
        })}

        <Form.Item>
          <Button
            type="primary"
            size="large"
            block
            onClick={handleSubmit}
            loading={loading}
          >
            Submit Form
          </Button>
        </Form.Item>
      </Form>

      {/* Side-by-side Live Preview and Submitted Data */}
      <div
        style={{
          display: "flex",
          gap: 24,
          marginTop: 24,
          maxWidth: 900,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Left: Live Preview */}
        <div
          style={{
            flex: 1,
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 8,
            overflowX: "auto",
            minHeight: 200,
          }}
        >
          <Title level={5}>
            <FileTextOutlined /> Live Preview (Form Data)
          </Title>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 14 }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>

        {/* Right: Submitted Data */}
        <div
          style={{
            flex: 1,
            background: "#e6f7ff",
            padding: 16,
            borderRadius: 8,
            overflowX: "auto",
            minHeight: 200,
          }}
        >
          <Title level={5}>Submitted Data</Title>
          {submittedData ? (
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 14 }}>
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          ) : (
            <Text type="secondary">No data submitted yet</Text>
          )}
        </div>
      </div>
    </Card>
  );
}

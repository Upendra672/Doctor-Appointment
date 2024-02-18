import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate()
  const inputStyle = {
    borderRadius: "30px",
    border: "1px solid rgba(128, 128, 128, 0.522)",
    height: "40px",
    color: "black",
  };

  const onFinish = async(values)=>{
    console.log("userlogin Success: ", values);
  try {
    const response = await axios.post('/api/user/login',values)
    console.log('login response: ', response);
    if(response.data.success) {
      toast.success(response.data.message)
      localStorage.setItem("token",response.data.token)
      navigate("/home")
    }else{
      toast.error(response.data.message)
    }
    
  } catch (error) {
    toast.error(response.data.message)
  }
  }
  return (
    <>
      <div className="auth">
        <div className="auth-form card p-3">
          <h1 className="card-title">Hello there!!</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please enter you email!",
                },
              ]}
            >
              <Input placeholder="Email" style={inputStyle} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" style={inputStyle} />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <div className="a"> <Link to="/register"> Click here to Register </Link> </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;

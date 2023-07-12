import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input, message } from 'antd';
import { nguoiDungServ } from "../../services/NguoiDungService";
import { luuXuongLocal } from "../../utilities/localStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { xetDuLieuHoTen } from "../../redux/slices/nguoiDungSlice";

const FormLogin = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
          taiKhoan: '',
          matKhau: '',
        },
        onSubmit: values => {
          console.log(values);
          // xử lý gửi dữ liệu 
          nguoiDungServ.dangNhap(values).then((result) => {
            console.log(result);
            // nếu như login thành công, sẽ lưu thong tin xuống local và chuyển hướng người dùng về trang chủ 
            messageApi.success("đăng nhập thành công!");
            // khi gọi dữ liệu thành công, sẽ lấy dữ liệu đó gửi lên redux 
            dispatch(xetDuLieuHoTen(result.data.content));
            luuXuongLocal("user", result.data.content);
            setTimeout(() => {
              navigate('/');
            },[1000]);
          })
          .catch((error) => {
            console.log(error);
            messageApi.error(error.response.data.content)
          })
        },
        validationSchema: yup.object({
          taiKhoan: yup.string().required("Nhập dữ liệu chưa đủ"),
          matKhau: yup.string().required("Nhớ nhập mk").min(3, 'nhập trên 3 nhé'),
        }),
      });

  const { handleSubmit, handleChange, handleBlur } = formik;     
  return (
    <div>
      
      {contextHolder}{' '}
      <form onSubmit={handleSubmit} onBlur={handleBlur}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Tài Khoản
          </label>
          {/* <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="taiKhoan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập tài khoản"

          /> */}
           <Input 
           name="taiKhoan"
           className="w-1/2"
           onChange={handleChange}
           onBlur={handleBlur}
           status = {
              formik.errors.taiKhoan && formik.touched.taiKhoan ? (
                <p className="text-red-500">{formik.errors.taiKhoan}</p>
              ) : (
                ""
              )
           }
           
           placeholder="" />
          {/* ở đây errors.taiKhoan giúp hiển thị lỗi*/}
           {/* nhưng gặp 1 vđ chỉ hiển thị lỗi khi người dùng đã sử dụng input đó, nên chúng ta cần check thêm touched của formik  */}
          {/* // {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
          //   <p className="text-red-500">{formik.errors.taiKhoan}</p>
          // ) : (
          //   ""
          // )} */}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
          >
            Mật Khẩu
          </label>
          <Input 
           name="matKhau"
           className="w-1/2"
           onChange={handleChange}
           onBlur={handleBlur}
           status = {
              formik.errors.matKhau && formik.touched.matKhau ? (
                <p className="text-red-500">{formik.errors.matKhau}</p>
              ) : (
                ""
              )
           }
           
           placeholder="" />
          {/* <input
            type="password"
            onChange={handleChange}
            name='matKhau'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className="text-red-500">{formik.errors.matKhau}</p>
          ) : (
            ""
          )} */}
        </div>
        <div className="flex items-start mb-6">
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default FormLogin;

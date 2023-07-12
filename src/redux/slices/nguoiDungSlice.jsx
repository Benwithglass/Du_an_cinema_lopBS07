import {createSlice} from '@reduxjs/toolkit'
import { layDuLieuLocal } from '../../utilities/localStore';

// lần đầu tiên vào trang web store sẽ đc khởi tạo 
const initialState = {
    hoTen: layDuLieuLocal('user')
}; 

// thư viện immerjs
export const nguoiDungSlice = createSlice({
    name: 'nguoiDung',
    initialState,
    reducers: {
        // ở đây tạo một phương thức giúp xử lí state bên trên store redux
        xetDuLieuHoTen: (state, action) => {
            // check xem hoTen có dữ liệu hay không, nếu không có set dữ liệu cho nó
            if (state.hoTen == null) {
                state.hoTen = action.payload;
            }
        },
    },
});

export const { xetDuLieuHoTen } = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
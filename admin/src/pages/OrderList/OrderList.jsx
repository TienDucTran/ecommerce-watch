import "./OrderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getOrder,

} from "../../redux/apiCalls";
import { useState } from "react";
import { userRequest } from "../../requestMethods";
import { handleCancel, handlePayment, handleProcess } from "./sharedFunctions";

export default function OrderList() {
  const dispatch = useDispatch();
  const orderProduct = useSelector((state) => state.order.orders);

  useEffect(() => {
    getOrder(dispatch);
  }, [dispatch]);

  

  const handleDelete = (id) => {
    deleteOrder(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "Name",
      headerName: "Name",
      width: 120,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.name}</div>;
      },
    },

    {
      field: "products",
      headerName: "Products",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.products.map((item, index) => (
              <div key={index} className="productBlock">
                <div className="productId">{item.productName}</div>
                {/* <div>quantity: {item.quantity}</div> */}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Price",
      width: 110,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 120,
    },
    {
      field: "address",
      headerName: "Address",
      width: 300,
    },
    {
      field: "status",
      headerName: "Process",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "success" ||
            params.row.status === "failed order" ? (
              <button
                className={
                  params.row.status === "success"
                    ? "productListEdit"
                    : "productListProcess"
                }
              >
                {params.row.status}
              </button>
            ) : (
              <a
                href="https://khachhang.giaohangtietkiem.vn/web/"
                className={
                  params.row.status === "transport"
                    ? "productListdelivered"
                    : "productListyellow"
                }
                onClick={() => handleProcess(params.row._id, params.row, dispatch)}
              >
                {params.row.status}
              </a>
            )}
          </>
        );
      },
    },
    {
      field: "payment",
      headerName: "Shiper",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "transport" ||
            params.row.status === "processing" ? (
              <button
                className={
                  params.row.payment === "waiting for payment"
                    ? "productListyellow"
                    : "productListProcess" 
                }
                onClick={() => handlePayment(params.row._id, params.row, dispatch)}
              >
                {params.row.payment}
              </button>
            ) : (
              <button
                className={
                  params.row.payment === "delivered"
                    ? "productListEdit"
                    : "productListProcess"
                }
              >
                {params.row.payment}
              </button>
            )}
          </>
        );
      },
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.row.payment === "delivered" ||
            params.row.status === "transport" ||
            params.row.status === "processing"? (
              <button
              className={
                params.row.customer === "completed"
                  ? "productListEdit"
                  : "productListyellow" ||
                    params.row.customer === "check"
                  ? "productListyellow"
                  : "productListEdit"
              }
                onClick={() => handleCancel(params.row._id, params.row, dispatch)}
              >
                {params.row.customer}
              </button>
            ) : (
              <button
                className={
                  params.row.customer === "cancel"
                    ? "productListProcess"
                    : "productListyellow"
                }
              >
                {params.row.customer}
              </button>
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orderProduct}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

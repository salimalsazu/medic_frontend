"use client";

import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { Button, Col, Input, Row, Select, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";
import UMBreadCrumb from "@/ui/UMBreadCrumb";
import ActionBar from "@/ui/ActionBar";
import TableList from "@/components/Table/TableList";
import {
  useGetBookingQuery,
  useGetMyBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/features/bookingApi";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormInput from "@/components/Forms/FormInput";
import ModalForm from "@/components/modal/modal";
import Form from "@/components/Forms/Form";
import { slot } from "@/constant/role";
import { useGetSlotQuery } from "@/redux/api/features/slotApi";
import { useGetServiceQuery } from "@/redux/api/features/serviceApi";

const MyBookingList = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [appointmentStatus, setAppointmentStatus] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["firstName"] = firstName;
  query["appointmentStatus"] = appointmentStatus;

  // get data
  const { data, isLoading } = useGetMyBookingQuery({ ...query });

  //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  //   const [editData, setEditData] = useState<any>(null);

  //   const [updateBooking, { isLoading: deleteLoading }] =
  //     useUpdateBookingMutation();

  //   const handleEdit = async (updated: any) => {
  //     const editedData = {
  //       serviceId: updated.service.serviceId,
  //       firstName: updated.profile.firstName,
  //       contactNumber: updated.profile.contactNumber,
  //       appointmentDate: updated.appointmentDate,
  //       appointmentStatus: updated.appointmentStatus,
  //       slotId: updated.slot.slotId,
  //     };

  //     const id = updated.appointmentId;

  //     try {
  //       const res = await updateBooking({ id, data: editedData }).unwrap();

  //       if (res) {
  //         message.success("Booking updated successfully");
  //         setIsEditModalOpen(false);
  //       }
  //     } catch (error: any) {
  //       console.log(error, "booking errror");
  //       console.error(error?.data);
  //       message.error(error?.data);
  //       // message.error("Slot May be booked");
  //     }
  //   };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "profile",
      render: (profile: any) => `${profile.firstName} ${profile.lastName}`,
      //   sorter: true,
    },
    {
      title: "Contact No",
      dataIndex: "profile",
      render: (profile: any) => `${profile.contactNumber}`,
      //   sorter: true,
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      render: (text: any) => {
        const date = new Date(text);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
        const day = date.getDate().toString().padStart(2, "0");
        return `${day}-${month}-${year}`;
      },
      //   sorter: true,
    },
    {
      title: "Time Slot",
      dataIndex: "slot",
      render: (slot: any) => `${slot.slotTime}`,
    },
    {
      title: "Service",
      dataIndex: "service",
      render: (service: any) => `${service.serviceName}`,
      //   sorter: true,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      //   sorter: true,
    },
    {
      title: "Status",
      dataIndex: "appointmentStatus",
      //   sorter: true,
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setFirstName("");
    setAppointmentStatus("");
  };

  const status = [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];

  const statusOnChange = (value: string) => {
    setAppointmentStatus(value);
    console.log(value);
  };

  return (
    <div className="my-10">
      <UMBreadCrumb
        items={[
          {
            label: "dashboard",
            link: "/dashboard",
          },
          {
            label: "booking-list",
            link: "/dashboard/booking/booking-list",
          },
        ]}
      />

      <ActionBar title="Booking List">
        <div className="flex gap-3">
          <Input
            type="text"
            size="large"
            placeholder="Search with Name"
            style={{
              width: "100%",
            }}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Select
            showSearch
            size="large"
            placeholder="Select Status"
            optionFilterProp="children"
            onChange={statusOnChange}
            // onSearch={onSearch}
            // filterOption={filterOption}
            options={status}
          />
        </div>
      </ActionBar>

      <TableList
        // loading={isLoading}
        columns={columns}
        dataSource={data}
        pageSize={size}
        // totalPages="meta?.total"
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default MyBookingList;
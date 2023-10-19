"use client";
import Image from "next/image";
import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { useForm, SubmitHandler } from "react-hook-form";
import TextArea from "antd/es/input/TextArea";
import FormSelectField from "../Forms/FormSelectField";
import { useCreateBookingMutation } from "@/redux/api/features/bookingApi";
import { useRouter } from "next/navigation";
import { useGetSlotQuery } from "@/redux/api/features/slotApi";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { useGetServiceQuery } from "@/redux/api/features/serviceApi";
import FormDatePicker from "../Forms/FormDatePicker";
import { getUserInfo, isLoggedIn } from "@/services/auth.services";
import { Button, Modal, message } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";

const Apointment = () => {
  const userLoggedIn = isLoggedIn();

  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["searchTerm"] = searchTerm;

  const { data: slotData, isLoading: slotLoading } = useGetSlotQuery({
    ...query,
  });

  const { data: serviceData, isLoading: serviceLoading } = useGetServiceQuery({
    ...query,
  });

  const [createBooking, { isLoading, isError }] = useCreateBookingMutation();

  const router = useRouter();

  // const bookingOnSubmit = async (data: any) => {
  //   message.loading("Creating new Service");

  //   const BookingData = {
  //     appointmentDate: data.appointmentDate,
  //     slotId: data.slot.slotId,
  //     serviceId: data.service.serviceId,
  //   };
  //   console.log(BookingData);
  //   try {
  //     const res = await createBooking(BookingData);

  //     // @ts-ignore
  //     if (res?.data && !isError) {
  //       message.success("Booking created successfully");
  //       router.push("/dashboard/booking/booking-list");
  //     }
  //   } catch (err: any) {
  //     console.error(err?.data?.message);
  //     message.error("something went wrong");
  //   }
  // };

  const bookingOnSubmit = async (data: any) => {
    message.loading("Creating new Booking");

    const dateString = data.appointmentDate?.$d;
    const dateObject = new Date(dateString);

    // Get ISO string
    const isoString = dateObject.toISOString();

    // console.log(isoString);

    const BookingData = {
      appointmentDate: isoString,
      slotId: data.slot.slotId,
      serviceId: data.service.serviceId,
    };
    console.log(BookingData);

    if (!userLoggedIn) {
      confirm({
        title: "Please Login First",
        icon: <ExclamationCircleFilled />,
        content: "You need to login first to book. Do you want to login?",
        onOk() {
          return router.push("/login");
        },
        onCancel() {},
      });

      return;
    } else {
      try {
        const res = await createBooking(BookingData).unwrap();
        console.log(
          "🚀 ~ file: FeedBackForum.tsx:35 ~ handleSubmit ~ res:",
          res
        );
        if (res?.success) {
          message.success("Feedback Submitted Successfully");
        }
      } catch (error: any) {
        console.error("Some thing was wrong");
        message.error("Some thing was wrong");
      }
    }
  };

  return (
    <div className="common md:flex gap-10 items-center mb-[60px] border border-spacing-1 rounded-md my-20 ">
      {/* FAQS */}
      <div className="font-inter my-[20px] md:my-0 flex flex-col md:h-[400px] justify-around ">
        <p className="font-poppins md:text-[45px] text-[35px] md:w-[550px] font-extrabold">
          Book Your Appointment
        </p>
        <p className="md:w-[500px] text-gray-[400px] font-poppins text-gray-500">
          The benefits of MEDDPICC are that it allows sellers to quickly qualify
          or disqualify opportunities.
        </p>

        {/* apoinment form */}

        <Form submitHandler={bookingOnSubmit}>
          <div className="my-[12px] flex items-center justify-center gap-2 w-full">
            <div style={{ margin: "10px 0px", width: "50%" }}>
              <FormDatePicker name="appointmentDate" label="Appointment Date" />
            </div>
            <div style={{ margin: "10px 0px", width: "40%" }}>
              <FormSelectField
                name="slot.slotId"
                label="Booking Slot"
                options={slotData?.map((c: any) => ({
                  label: c.slotTime,
                  value: c.slotId,
                }))}
              />
            </div>
            <div style={{ margin: "10px 0px", width: "40%" }}>
              <FormSelectField
                name="service.serviceId"
                label="Service Name"
                options={serviceData?.map((c: any) => ({
                  label: c.serviceName,
                  value: c.serviceId,
                }))}
              />
            </div>
          </div>

          <button type="submit" className="appointmentButton">
            Make Appoinment
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Apointment;

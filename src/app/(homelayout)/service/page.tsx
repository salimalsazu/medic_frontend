"use client";

import React, { useState } from "react";
import { useGetServiceQuery } from "@/redux/api/features/serviceApi";
import ServiceCard from "@/components/Services/ServiceCard";
import ActionBar from "@/ui/ActionBar";
import { Input } from "antd";

const ServicesPage = () => {
  const query: Record<string, any> = {};

  const [searchTerm, setSearchTerm] = useState<string>("");

  query["searchTerm"] = searchTerm;

  // get data
  const { data, isLoading } = useGetServiceQuery({ ...query });

  return (
    <div className="common pb-[100px] flex flex-col justify-center items-center">
      <p className="text-black md:text-[30px] text-[32px] font-semibold mt-20">
        OUR SERVICES
      </p>
      <p className="font-poppins mx-auto mt-12 text-center ">
        Explore our comprehensive range of cutting-edge medical facilities and
        services, carefully curated and personalized just for you. From
        state-of-the-art diagnostic tools to expert medical professionals, we
        are committed to delivering the best healthcare experience.
      </p>

      <div className="mt-5 w-[60%]">
        <ActionBar>
          <Input
            type="text"
            size="large"
            placeholder="Search by title......"
            style={{
              width: "100%",
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </ActionBar>
      </div>
      {/* service card */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 justify-between mt-10">
        {data?.map((service: any, index: number) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;

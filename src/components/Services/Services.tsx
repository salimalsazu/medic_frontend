import { IServiceTypes } from "@/types/Service";
import React, { useState } from "react";
import ServiceCard from "./ServiceCard";
import { useGetServiceQuery } from "@/redux/api/features/serviceApi";

const Services = () => {
  const query: Record<string, any> = {};

  const [searchTerm, setSearchTerm] = useState<string>("");

  query["searchTerm"] = searchTerm;

  // get data
  const { data, isLoading } = useGetServiceQuery({ ...query });

  const AvailableService = data?.filter(
    (service: any) => service?.serviceStatus === "Available"
  );

  return (
    <div className="common pb-[100px]">
      <p className="text-primary flex justify-center items-center md:text-[20px] text-[32px] font-semibold">
        OUR AVAILABLE SERVICES
      </p>
      <div></div>
      {/* service card */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1 justify-center items-center">
        {AvailableService?.map((service: any, index: number) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;

import { IServiceTypes } from "@/types/Service";
import React, { useState } from "react";
import ServiceCard from "./ServiceCard";
import { useGetServiceQuery } from "@/redux/api/features/serviceApi";

const UpComingService = () => {
  const query: Record<string, any> = {};

  const [searchTerm, setSearchTerm] = useState<string>("");

  query["searchTerm"] = searchTerm;

  // get data
  const { data, isLoading } = useGetServiceQuery({ ...query });

  const upComingService = data?.filter(
    (service: any) => service?.serviceStatus === "Upcoming"
  );

  return (
    <div className="common pb-[100px]">
      <p className="text-primary flex justify-center items-center md:text-[20px] text-[32px] font-semibold">
        OUR UPCOMING SERVICES
      </p>
      <div></div>
      {/* service card */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1 justify-center items-center">
        {upComingService?.map((service: any, index: number) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </div>
  );
};

export default UpComingService;

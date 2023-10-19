import Image from "next/image";

const page = () => {
  return (
    <div>
      <>
        {/* component */}
        <div className="py-16 bg-white">
          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
              <div className="md:5/12 lg:w-5/12">
                <Image
                  src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                  alt="image"
                  loading="lazy"
                  width={500}
                  height={500}
                />
              </div>
              <div className="md:7/12 lg:w-6/12">
                <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                  Uttara Medic Hospital
                </h2>
                <p className="mt-6 text-gray-600">
                  <span className="font-bold">About Us:</span> <br /> Medic
                  Hospital is a modern medical center dedicated to delivering
                  top-quality healthcare with compassion. Our central city
                  location ensures easy access for patients. We house
                  specialized departments, staffed by experienced professionals
                  in cardiology, orthopedics, pediatrics, oncology, neurology,
                  and more, equipped with the latest technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default page;

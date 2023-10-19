import Image from "next/image";

const Testimonial = () => {
  return (
    <div className="text-gray-600 dark:text-gray-300 mt-8" id="reviews">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-10 space-y-4 px-6 md:px-0">
          <h2 className="text-center text-2xl font-bold md:text-4xl text-black">
            We have some fans.
          </h2>
        </div>
        <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <Image
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/12.jpg"
                alt="user avatar"
                width={400}
                height={400}
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                  Daniella Doe
                </h6>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                 Manager, LPP Cloths
                </p>
              </div>
            </div>
            <p className="mt-8">
            The medical team at this hospital is truly exceptional. From the moment I walked in, their professionalism and compassion were evident. My surgery went smoothly, and the post-operative care was outstanding.
            </p>
          </div>
          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <Image
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/14.jpg"
                alt="user avatar"
                width={200}
                height={200}
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                  Jane doe
                </h6>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  CEO, ABC Corp.
                </p>
              </div>
            </div>
            <p className="mt-8">
              {" "}
              I amm incredibly grateful for the skilled surgeons and the caring staff at this hospital. They made my orthopedic surgery a positive experience, and I amm well on my way to recovery. Thank you for the top-notch care!
            </p>
          </div>
          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <Image
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/18.jpg"
                alt="user avatar"
                width={200}
                height={200}
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                  Yanick Doe
                </h6>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Developer
                </p>
              </div>
            </div>
            <p className="mt-8">
            My recent cardiac surgery at this hospital was a success, and I can not thank the cardiovascular team enough. Their expertise and dedication were apparent at every step. I feel like I have been given a new lease on life.
            </p>
          </div>
          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <Image
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt="user avatar"
                width={200}
                height={200}
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                  Jane Doe
                </h6>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Journalist
                </p>
              </div>
            </div>
            <p className="mt-8">
            The plastic and reconstructive surgery team here has transformed my life. After a traumatic accident, they restored not just my physical appearance but also my self-confidence. I can not express how grateful I am for their work
            </p>
          </div>
          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <Image
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/62.jpg"
                alt="user avatar"
                width={200}
                height={200}
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                  Andy Doe
                </h6>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Teacher
                </p>
              </div>
            </div>
            <p className="mt-8">
              {" "}
              The urological surgery team provided exceptional care during my recent procedure. They were attentive, informative, and made me feel comfortable throughout the process. I could not have asked for better treatment.
            </p>
          </div>
          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <Image
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/19.jpg"
                alt="user avatar"
                width={400}
                height={400}
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                  Yanndy Doe
                </h6>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Mobile dev
                </p>
              </div>
            </div>
            <p className="mt-8">
            I had the pleasure of experiencing the excellent care provided by the gynecological surgery team at this hospital. They addressed my concerns with empathy and professionalism, and the surgery and recovery were both incredibly smooth. Thank you for your outstanding service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

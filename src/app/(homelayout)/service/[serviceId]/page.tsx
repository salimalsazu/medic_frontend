/* eslint-disable @next/next/no-img-element */
"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Empty, Rate, Skeleton } from "antd";
import React from "react";

import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import Form from "@/components/Forms/Form";
import FormTextArea from "@/components/Forms/FormTextArea";

import { useRouter } from "next/navigation";
import { Modal, message } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";

import { IServiceTypes } from "@/types/Service";
import { getUserInfo, isLoggedIn } from "@/services/auth.services";
import { addToCart } from "@/redux/slice/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useCreateReviewMutation } from "@/redux/api/features/reviewApi";
import { useGetSingleServiceQuery } from "@/redux/api/features/serviceApi";
import FormRating from "@/components/Forms/FormRating";

const faqs = [
  {
    question: "What format are these icons?",
    answer:
      "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.",
  },
  {
    question: "Can I use the icons at different sizes?",
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
];
const license = {
  href: "#",
  summary:
    "For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.",
  content: `
    <h4>Overview</h4>
    
    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
    
    <ul role="list">
    <li>You\'re allowed to use the icons in unlimited projects.</li>
    <li>Attribution is not required to use the icons.</li>
    </ul>
    
    <h4>What you can do with it</h4>
    
    <ul role="list">
    <li>Use them freely in your personal and professional work.</li>
    <li>Make them your own. Change the colors to suit your project or brand.</li>
    </ul>
    
    <h4>What you can\'t do with it</h4>
    
    <ul role="list">
    <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
    <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
    </ul>
  `,
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const ServiceDetails = ({ params }: any) => {
  const [createRating, { isLoading: reviewLoading }] =
    useCreateReviewMutation();
  const dispatch = useAppDispatch();
  const userLoggedIn = isLoggedIn();

  const user = getUserInfo();

  const router = useRouter();
  const serviceId = params?.serviceId;
  const { data: singleService, isLoading: singleServiceLoading } =
    useGetSingleServiceQuery(serviceId);

  if (singleServiceLoading) {
    return (
      <div className="flex items-center my-8 w-full common">
        <Skeleton active />
      </div>
    );
  }

  // review

  const handleReview = async (data: any) => {
    if (!userLoggedIn) {
      confirm({
        title: "Please Login First",
        icon: <ExclamationCircleFilled />,
        content:
          "You need to login first to give Review. Do you want to login?",
        onOk() {
          return router.push("/login");
        },
        onCancel() {},
      });

      return;
    } else {
      try {
        const updateData = {
          reviewComment: data?.reviewComment,
          reviewRating: data?.reviewRating?.toString(),
          serviceId,
        };

        const res: any = await createRating(updateData);
        if (res?.data?.success) {
          message.success("Review Added Successfully");
        }
      } catch (error: any) {
        console.error(error);
        message.error(error?.data?.message);
      }
    }
  };

  const handleBuy = (data: any) => {
    if (!userLoggedIn) {
      confirm({
        title: "Please Login First",
        icon: <ExclamationCircleFilled />,
        content: "You need to login first to Buy This. Do you want to login?",
        onOk() {
          return router.push("/login");
        },
        onCancel() {},
      });

      return;
    } else {
      Modal.warning({
        title: "This feature is under maintains",
        content: "Sorry for the inconvenience",
      });
    }
  };

  // add to cart

  const handleAddToCart = (addedService: IServiceTypes) => {
    if (!userLoggedIn) {
      confirm({
        title: "Please Login First",
        icon: <ExclamationCircleFilled />,
        content:
          "You need to login first to Add To Cart This. Do you want to login?",
        onOk() {
          return router.push("/login");
        },
        onCancel() {},
      });

      return;
    } else {
      dispatch(addToCart(addedService));
      message.success("Service added to cart");
    }
  };

  let rating = 0;

  if (
    singleService?.reviewAndRatings &&
    singleService?.reviewAndRatings?.length > 0
  ) {
    for (const review of singleService?.reviewAndRatings) {
      rating += Number(review.reviewRating);
    }
  }

  return (
    <div className="bg-white">
      <div className=" common pt-[20px]">
        <UMBreadCrumb
          items={[
            { label: `Services`, link: `/services` },
            { label: "Services Details", link: `` },
          ]}
        />
      </div>
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 ">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={singleService?.serviceImage}
                alt={singleService?.serviceName}
                className="object-cover object-center w-[1360px] h-[380px] "
              />
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div>
              <div className="flex flex-col-reverse">
                <div className="mt-4">
                  {rating > 0 && (
                    <div>
                      <Rate
                        value={
                          rating / singleService?.reviewAndRatings?.length!
                        }
                        disabled
                      />
                    </div>
                  )}
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {singleService?.serviceName}
                  </h1>

                  <h2 id="information-heading" className="sr-only">
                    Product information
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    (Created{" "}
                    {new Date(singleService?.createdAt!).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                    )
                  </p>
                </div>

                {/* <div>
                  <h3 className="sr-only">Reviews</h3>
                  <Rate disabled defaultValue={reviews.average} />
                </div> */}
              </div>
            </div>

            {/* dashcription */}
            <p className="mt-6 text-gray-500">{singleService?.description}</p>
            {/* buttons */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                onClick={handleBuy}
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Pay ৳{singleService?.servicePrice}
              </button>
              <button
                onClick={() => handleAddToCart(singleService)}
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Add to cart
              </button>
            </div>

            {/* social */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Share</h3>
              <ul role="list" className="mt-4 flex items-center space-x-6">
                <li>
                  <a
                    href="https://www.facebook.com/masud90895"
                    target="_blank"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Facebook</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Instagram</span>
                    <svg
                      className="h-6 w-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Twitter</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
          <Tab.Group as="div">
            <div className="border-b border-gray-200">
              <Tab.List className="-mb-px flex space-x-8">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                      "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                    )
                  }
                >
                  Customer Reviews
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                      "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                    )
                  }
                >
                  FAQ
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                      "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                    )
                  }
                >
                  License
                </Tab>
              </Tab.List>
            </div>
            <Tab.Panels as={Fragment}>
              <Tab.Panel className="-mb-10">
                <h3 className="sr-only">Customer Reviews</h3>

                <div className="mt-2">
                  <Form submitHandler={handleReview}>
                    <FormRating name="reviewRating" />
                    <FormTextArea
                      name="reviewComment"
                      placeholder="Write your review here"
                      required
                      rows={5}
                    />

                    <Button
                      loading={reviewLoading}
                      disabled={reviewLoading}
                      htmlType="submit"
                      size={"large"}
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      Submit
                    </Button>
                  </Form>
                </div>

                {singleService?.reviewAndRatings?.length > 0 ? (
                  singleService?.reviewAndRatings?.map(
                    (review: any, reviewIdx: number) => (
                      <div
                        key={reviewIdx}
                        className="flex space-x-4 text-sm text-gray-500 w-full"
                      >
                        <div className="flex-none py-10">
                          <img
                            src={
                              review?.profile?.profileImage ??
                              "https://www.truckeradvisor.com/media/uploads/profilePics/notFound.jpg"
                            }
                            alt=""
                            className="h-10 w-10 rounded-full bg-gray-100"
                          />
                        </div>
                        <div
                          className={classNames(
                            reviewIdx === 0 ? "" : "border-t border-gray-200",
                            "py-10"
                          )}
                        >
                          <h3 className="font-medium text-gray-900">
                            {review?.profile?.firstName +
                              " " +
                              review?.profile?.lastName}
                          </h3>
                          <p>
                            {new Date(review?.createdAt!).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>

                          <div className="mt-4 flex items-center">
                            <Rate disabled defaultValue={review.reviewRating} />
                          </div>
                          <p className="sr-only">
                            {review?.reviewRating} out of 5 stars
                          </p>

                          <div
                            className="prose prose-sm mt-4 max-w-none text-gray-500"
                            dangerouslySetInnerHTML={{
                              __html: review?.reviewComment,
                            }}
                          />
                        </div>

                        {/* {review?.profile?.profileId ===  } */}
                      </div>
                    )
                  )
                ) : (
                  <Empty description="No Reviews Yet" />
                )}
              </Tab.Panel>

              <Tab.Panel className="text-sm text-gray-500">
                <h3 className="sr-only">Frequently Asked Questions</h3>

                <dl>
                  {faqs.map((faq) => (
                    <Fragment key={faq.question}>
                      <dt className="mt-10 font-medium text-gray-900">
                        {faq.question}
                      </dt>
                      <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                        <p>{faq.answer}</p>
                      </dd>
                    </Fragment>
                  ))}
                </dl>
              </Tab.Panel>

              <Tab.Panel className="pt-10">
                <h3 className="sr-only">License</h3>

                <div
                  className="prose prose-sm max-w-none text-gray-500"
                  dangerouslySetInnerHTML={{ __html: license.content }}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;

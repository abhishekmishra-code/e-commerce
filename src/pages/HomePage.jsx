import React from "react";
import { useSelector } from "react-redux";
import Container from "../components/layout/Container";
import ProductList from "../components/products/ProductList";
import CustomSwiper from "../components/carousel/CustomSwiper";
import {
  FaGift,
  FaHeadset,
  FaTags,
  FaTruckMoving,
} from "react-icons/fa";
import { Link } from "react-router";
import {
  SpeakerWaveIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/solid";

export default function HomePage() {
  const { userData } = useSelector((state) => state.auth);
  const products = [
    {
      tag: "Best Seller",
      icon: <SpeakerWaveIcon className="text-blue-600 dark:text-blue-400 h-12 w-12" />,
      name: "FITRIC M3 Portable Bluetooth Mini Speaker",
      price: "₹799",
      oldPrice: "₹1,299",
    },
    {
      tag: "New Arrival",
      icon: <DevicePhoneMobileIcon className="text-blue-600 dark:text-blue-400 h-12 w-12" />,
      name: "FITRIC Upgraded Latest Wireless Stylish Neckband",
      price: "₹1,099",
      oldPrice: "₹1,799",
    },
    {
      tag: "Limited Stock",
      icon: <DevicePhoneMobileIcon className="text-blue-600 dark:text-blue-400 h-12 w-12" />,
      name: "FITRIC Touch Screen Display Wireless Earbuds",
      price: "₹1,499",
      oldPrice: "₹2,299",
    },
    {
      tag: "Best Seller",
      icon: <FaGift className="text-blue-600 dark:text-blue-400 h-12 w-12" />,
      name: "FITRIC Water Dispenser 5698 Bottled Water Dispenser",
      price: "₹1,299",
      oldPrice: "₹1,899",
    },
  ];
  const slides = [
    <img
      src="/img/BANNER_Artboard_1_copy_f4f69e13-0d2e-4dae-ab03-205517c9e1de_1440x.webp"
      alt="desktop banner1"
      className="h-full w-full object-cover"
    />,
    <img
      src="/img/desktop_banner_eae66d9b-996f-4a84-b945-b8df00a062ad_1600x.webp"
      alt="desktop banner2"
      className="h-full w-full object-cover"
    />,
    <img
      src="/img/Artboard_1_f96ab25c-d2ee-4140-9633-d688648cc48d_1440x.webp"
      alt="Slide 1"
      className="h-full w-full object-cover"
    />,
    <img
      src="/img/Artboard_1_copy_2_976d9c9f-d540-4e00-922c-d3fed4df2789_1440x.webp"
      alt="Slide 2"
      className="h-full w-full object-cover"
    />,
    <img
      src="/img/Artboard_1_b055ad3c-a797-463e-b6e5-eabb050997db_1440x.webp"
      alt="Slide 3"
      className="h-full w-full object-cover"
    />,
    <img
      src="/img/Artboard_1_58e58b63-5f18-493e-93be-59539f27b703_1440x.webp"
      alt="Slide 4"
      className="h-full w-full object-cover"
    />,
    <img
      src="/img/Artboard_1_29572f9a-b84d-4801-ba91-197f68260371_1440x.webp"
      alt="Slide 5"
      className="h-full w-full object-cover"
    />,
    <img
      src="/img/Custom_1440x.webp"
      alt="Slide 6"
      className="h-full w-full object-cover"
    />,
    <img
      src="/img/silicon-cover-new-web_1600x.webp"
      alt="Slide 7"
      className="h-full w-full object-cover"
    />,
  ];
  const slides2 = [
    <img
      src="/img/1080x720_73e6fd6f-e848-4f69-af23-1c29446f2698_600x.webp"
      alt="desktop banner1"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <img
      src="/img/1080x720_fa0163d2-2df6-4828-8db5-938ad5f264d7_600x.webp"
      alt="desktop banner2"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <img
      src="/img/1080x720_7e059f67-3f23-4cfd-ae76-a4fe2321be8c_600x.webp"
      alt="Slide 1"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <img
      src="/img/1080x720_522f512e-3a7f-4e4a-b431-a237f8e84421_600x.webp"
      alt="Slide 2"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <img
      src="/img/1080x720_aedec7e6-fe4e-4531-9bb0-3f2775e6bbc3_600x.webp"
      alt="Slide 3"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <img
      src="/img/1080x720_032a683d-5f15-417e-b50e-00d4400b3f05_600x.webp"
      alt="Slide 4"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <img
      src="/img/1080x720_4_169fa879-c8ac-470d-8321-aa1a6373d588_600x.webp"
      alt="Slide 5"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <img
      src="/img/1080x720_b519e43c-5d35-4125-9fd9-6117c70383fc_600x.webp"
      alt="Slide 6"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <img
      src="/img/Artboard_1_cbd1491e-6f5f-4afd-abe4-accc71ecee6c_600x.webp"
      alt="Slide 7"
      className="h-full w-full rounded-2xl object-cover"
    />,
  ];
  return (
    <>
      {window.innerWidth > 768 ? (
        <div className="w-full pt-8 lg:max-h-screen">
          <CustomSwiper
            slides={slides}
            autoplayDelay={3000}
            spaceBetween={20}
            showProgress={true}
            className="h-[500px]"
          />
        </div>
      ) : (
        <div className="w-full pt-8 md:pt-0 lg:max-h-screen">
          <CustomSwiper
            slides={slides2}
            autoplayDelay={3000}
            spaceBetween={20}
            showProgress={true}
            className="h-[500px]"
          />
        </div>
      )}
      <Container className="bg-gray-50 dark:bg-gray-900">
        <>
          {/* Value Props */}
          <section className="value-props mx-auto my-10 flex max-w-6xl flex-col justify-between gap-6 px-[2vw] lg:flex-row">
            {[
              {
                icon: <FaHeadset className="text-4xl text-blue-600 dark:text-blue-400" />,
                title: "Customer Care You Can Trust",
                desc: "24/7 Support for all your needs.",
              },
              {
                icon: <FaGift className="text-4xl text-blue-600 dark:text-blue-400" />,
                title: "Handpicked for Quality",
                desc: "Curated collection from gadgets to home essentials.",
              },
              {
                icon: <FaTags className="text-4xl text-blue-600 dark:text-blue-400" />,
                title: "Unbeatable Value",
                desc: "Best Price Guarantee on every product.",
              },
              {
                icon: <FaTruckMoving className="text-4xl text-blue-600 dark:text-blue-400" />,
                title: "Doorstep Delivery in Delhi-NCR",
                desc: "On-time & secure delivery, always.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="value-prop flex w-full min-w-44 flex-col items-center rounded-lg bg-white dark:bg-gray-800 px-4 py-5 text-center shadow-md dark:shadow-gray-700/20"
              >
                {item.icon}
                <h4 className="my-1.5 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </section>

          {/* Categories */}
          <section className="categories-section mx-auto mb-10 max-w-6xl px-[2vw]">
            <div className="categories-title mb-4 text-2xl font-semibold text-blue-600 dark:text-blue-400">
              Shop by Category
            </div>
            <div className="categories mb-4 flex flex-wrap gap-6">
              {[
                {
                  img: "https://img.icons8.com/color/96/000000/microwave.png",
                  label: "Kitchen Appliances",
                },
                {
                  img: "https://img.icons8.com/color/96/000000/tv.png",
                  label: "Home Entertainment",
                },
                {
                  img: "https://img.icons8.com/?size=100&id=Ebnkzzpji4Bu&format=png&color=000000",
                  label: "Smart Home Devices",
                },
              ].map((cat, idx) => (
                <div
                  key={idx}
                  className="category-card flex min-w-48 flex-1 cursor-pointer flex-col items-center rounded-lg bg-white dark:bg-gray-800 px-4 py-5 shadow-md dark:shadow-gray-700/20"
                >
                  <img
                    className="mb-3 w-20 object-contain"
                    src={cat.img}
                    alt={cat.label}
                  />
                  <h5 className="mt-1 mb-0.5 text-lg font-semibold text-gray-900 dark:text-white">
                    {cat.label}
                  </h5>
                </div>
              ))}
            </div>
            <Link
              to="#"
              className="view-all-categories mt-2 inline-block font-medium text-blue-600 dark:text-blue-400"
            >
              View All Categories →
            </Link>
          </section>

          {/* Products */}
          <section className="mx-auto mb-10 max-w-[1100px] px-4">
            <div className="text-blue-600 dark:text-blue-400 mb-4 text-[1.5em] font-semibold">
              New Arrivals &amp; Bestsellers
            </div>
            <div className="flex flex-wrap justify-around gap-6">
              {products.map((product, idx) => (
                <div
                  key={idx}
                  className="relative mb-6 flex max-w-[250px] min-w-[220px] flex-1 flex-col items-center rounded-lg bg-white dark:bg-gray-800 p-5 shadow-sm dark:shadow-gray-700/20 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-lg dark:hover:shadow-gray-700/40"
                >
                  {/* Tag */}
                  <span className="bg-blue-600 dark:bg-blue-400 absolute top-3 left-3 rounded px-2 py-0.5 text-xs font-semibold text-white">
                    {product.tag}
                  </span>
                  {/* Product Icon */}
                  <div className="mb-3">{product.icon}</div>
                  {/* Product Name */}
                  <h6 className="mb-1 text-center text-base font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h6>
                  {/* Price Row */}
                  <div className="mb-2 flex items-center">
                    <span className="text-green-600 dark:text-green-400 text-lg font-semibold">
                      {product.price}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 ml-2 text-sm line-through">
                      {product.oldPrice}
                    </span>
                  </div>
                  {/* Actions */}
                  <div className="mt-3 flex gap-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 rounded px-4 py-2 font-medium text-white transition-colors duration-200 focus:outline-hidden active:scale-95"
                    >
                      Add to Cart
                    </button>
                    <a
                      href="#"
                      className="border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-400 rounded border bg-white dark:bg-gray-800 px-4 py-2 font-medium transition-colors duration-200 hover:text-white dark:hover:text-white focus:outline-hidden active:scale-95"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section>
            <div className="container mx-auto py-8 text-gray-900 dark:text-gray-100">
              <h1 className="mb-8 text-3xl font-bold">Featured Products</h1>
              <ProductList limit={20} />
            </div>
          </section>

          {/* Newsletter */}
          <section className="newsletter-section mb-10 rounded-lg bg-blue-600 dark:bg-blue-400 px-1 py-8 text-center text-white md:mx-[2vw]">
            <h3 className="mt-5 mb-2 text-2xl font-semibold">
              Never Miss a Beat with Fitric – Get Exclusive Offers!
            </h3>
            <p className="mt-4 mb-4 text-lg">
              Sign up and get <b>5% off</b> your first order!
            </p>
            <form
              className="newsletter-form mx-auto flex max-w-96 flex-wrap items-center justify-center gap-2 sm:flex-nowrap"
              onSubmit={(e) => {
                e.preventDefault();
                // handle newsletter signup
              }}
            >
              <input
                className="min-w-9/12 rounded bg-white dark:bg-gray-100 px-4 py-2 text-base text-gray-950 outline-none"
                type="email"
                placeholder="Enter your email address"
                required
              />
              <button
                className="cursor-pointer rounded bg-green-500 hover:bg-green-600 text-white px-5 py-2 font-semibold duration-200 ease-in-out"
                type="submit"
              >
                Subscribe
              </button>
            </form>
            <small className="mt-3 block text-[0.95em] text-white/80 dark:text-white/90">
              We respect your privacy. Unsubscribe anytime.
            </small>
          </section>
        </>
      </Container>
    </>
  );
}
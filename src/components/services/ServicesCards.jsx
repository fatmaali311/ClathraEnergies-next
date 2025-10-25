import React from "react";
import { motion } from "framer-motion";
import {
  containerVariants,
  cardSlideUp,
  fadeUp,
  listContainer,
  listItem,
} from "../../utils/animations";
import CustomButton from "../common/CustomButton";
import { getImageUrl } from '../../utils/imageUtils'

export default function ServicesCards({ services = [] }) {
  if (!services?.length) return null;

  return (
    <section className="section-container bg-white">
      <div className="flex flex-col gap-24 mb-12 text-center"> 

        {services.map((svc, i) => {
          const obj = svc.data?.serviceObj || {};
          const images = svc.data?.images || {};

          const mainColor = obj.main_color || "var(--primary-green)";
          const buttonText = obj.main_button?.name || obj.home_button?.name || "Learn More";
          const buttonLink = obj.main_button?.link || "#";
          const buttonBgColor = mainColor;
          const buttonHoverColor = obj.buttonColor || mainColor;

          return (
            <motion.div
              key={svc._id}
              variants={cardSlideUp}
              initial="hidden"
              animate={i === 0 ? "show" : undefined}
              whileInView={i !== 0 ? "show" : undefined}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -12, scale: 1.01 }}
              className={`relative bg-white cursor-pointer
                flex flex-col items-center text-center
                w-full max-w-6xl mx-auto p-8 sm:p-12 md:p-16 pt-24
                shadow-[8px_8px_20px_rgba(0,0,0,0.15)]
                transition-all duration-300`}
              style={{ border: `3px solid ${mainColor}` }}
              id={`service-${svc.slug || svc._id}`}
            >
              {/* Number Badge */}
              <motion.div
                variants={fadeUp(i, 0.2)}
                initial="hidden"
                animate={i === 0 ? "visible" : undefined}
                whileInView={i !== 0 ? "visible" : undefined}
                viewport={{ once: true, amount: 0.2 }}
                className={`absolute -top-8 -left-4 sm:-top-10 sm:-left-6 
                  w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 
                  flex items-center justify-center
                  text-white text-xl sm:text-2xl md:text-3xl font-bold
                  shadow-[6px_6px_15px_rgba(0,0,0,0.25)]`}
                style={{ background: mainColor }}
              >
                {i + 1}
              </motion.div>

              {/* Title + Subtitle + Paragraph */}
              <motion.div
                variants={fadeUp(i, 0.3)}
                initial="hidden"
                animate={i === 0 ? "visible" : undefined}
                whileInView={i !== 0 ? "visible" : undefined}
                viewport={{ once: true, amount: 0.2 }}
                className="px-4 sm:px-12 mb-12 mx-auto text-center"
              >
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-semibold mb-6 text-gray-700">
                  {svc.title}
                </h3>

                {obj.sub_title && (
                  <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-4 leading-relaxed">
                    {obj.sub_title}
                  </p>
                )}

                {obj.paragraph && (
                  <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
                    {obj.paragraph}
                  </p>
                )}
              </motion.div>

              {/* Inner Boxes */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-10 w-full grid-cols-1 sm:grid-cols-2 justify-items-center items-stretch"
              >
                {(obj.details || []).map((box, j) => {
                  const points = box.points ? Object.values(box.points) : [];
                  const iconUrl = getImageUrl(images[box.icon] || "");
                  const isLastOdd =
                    (obj.details || []).length % 2 !== 0 &&
                    j === (obj.details || []).length - 1;

                  return (
                    <motion.div
                      key={j}
                      variants={cardSlideUp}
                      whileHover={{
                        y: -10,
                        scale: 1.02,
                        boxShadow: "0 14px 20px -5px rgba(107,114,128,0.25)",
                        transition: { type: "spring", stiffness: 300, damping: 20 },
                      }}
                      className={`relative flex flex-col items-center text-center 
                        w-full max-w-sm sm:max-w-md p-8 sm:p-10 min-h-[340px]
                        bg-white 
                        shadow-[0_10px_15px_-5px_rgba(0,0,0,0.2)] transition-all duration-300 
                        ${isLastOdd ? "sm:col-span-2 sm:w-1/2 mx-auto" : ""}`}
                      style={{ border: `2px solid ${mainColor}` }}
                    >
                      {/* Icon */}
                      {iconUrl && (
                        <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6">
                          <img
                            src={iconUrl}
                            alt={box.title}
                            className="object-contain w-3/4 h-3/4"
                          />
                        </div>
                      )}

                      {/* Title */}
                      <h4 className="mb-4 font-semibold text-lg sm:text-2xl md:text-3xl text-gray-700">
                        {box.title}
                      </h4>

                      {/* Points */}
                      {points.length > 0 && (
                        <motion.ol
                          variants={listContainer}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, amount: 0.2 }}
                          className="list-decimal w-full space-y-2 text-left max-w-xs
                            pl-6 sm:pl-8 md:pl-10 lg:pl-14
                            text-sm sm:text-base md:text-lg text-gray-600"
                        >
                          {points.map((p, k) => (
                            <motion.li
                              key={k}
                              variants={listItem}
                              className="leading-relaxed"
                            >
                              {p}
                            </motion.li>
                          ))}
                        </motion.ol>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Button */}
              <div className="mt-12 w-full flex justify-center">
                <div className="w-md mx-auto">
                  <CustomButton
                    text={buttonText}
                    as="link"
                    to={buttonLink}
                    bgColor={buttonBgColor}
                    hoverColor={buttonHoverColor}
                    target="_blank"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

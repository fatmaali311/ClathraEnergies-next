'use client';

import { motion } from "framer-motion";
import {
  containerVariants,
  cardVariants,
  viewportSettings,
} from "../../utils/animations";
import CustomButton from "../../components/common/CustomButton";
import { getImageUrl } from "../../utils/imageUtils";

// Normalize backend services data
function normalizeServices(services = []) {
  return services.map((svc, idx) => {
    const obj = svc.data?.serviceObj || {};
    const images = svc.data?.images || {};
    const mainColor = obj.main_color || "var(--primary-green)";
    const titleColor = obj.title_color || "text-gray-800";

    return {
      number: idx + 1,
      title: svc.title || obj.title || `Service ${idx + 1}`,
      image: getImageUrl(images["service-image"] || Object.values(images)[0] || ""),
      slug: svc.title?.toLowerCase().replace(/\s+/g, "-") || svc._id,
      mainColor,
      titleColor,
    };
  });
}

export default function ServicesSection({ services = [], title, dict }) {
  const list = normalizeServices(services);
  if (!list.length) return null;

  return (
    <section className="section-container">
      <h2 className="section-title text-center md:mb-24 mb-16" style={{ color: 'var(--title-color)' }}>
        {title}
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={viewportSettings}
        className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-16 md:gap-22 lg:gap-28 flex-wrap"
      >
        {list.map((service) => (
          <motion.div
            key={service.number}
            variants={cardVariants}
            whileHover={{
              y: -12,
              scale: 1.01,
              boxShadow: "0 14px 20px -5px rgba(107,114,128,0.3)",
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            className="w-full max-w-[400px] transition-all duration-300 mb-12"
          >
            <div
              className="relative flex flex-col items-center transition-all duration-300 p-5 sm:p-6 min-h-[340px] sm:min-h-[380px] md:min-h-[480px] bg-white"
              style={{
                border: `2px solid ${service.mainColor}`,
                boxShadow: "0 10px 15px -5px rgba(0,0,0,0.2)",
              }}
            >
              {/* Number Badge */}
              <div
                className="absolute top-6 left-6 flex items-center justify-center rounded-full text-white w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 text-2xl sm:text-3xl md:text-4xl transition-shadow duration-200"
                style={{
                  backgroundColor: service.mainColor,
                  boxShadow: "0 6px 10px -3px rgba(0,0,0,0.2)",
                }}
              >
                {service.number}
              </div>

              {/* Image */}
              <div className="flex flex-col items-center gap-6 mt-12 md:mt-20">
                <div className="flex items-center justify-center overflow-hidden w-30 h-30 sm:w-36 sm:h-36 md:w-44 md:h-44">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={`${service.title} illustration`}
                      className="object-contain w-3/4 h-3/4"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-full" />
                  )}
                </div>
              </div>

              {/* Title */}
              <h3
                className={`mb-4 md:mb-2 mt-4 md:mt-2 font-medium text-center ${service.titleColor} text-lg sm:text-xl md:text-2xl`}
                style={{ color: service.mainColor }}
              >
                {service.title}
              </h3>

              {/* Button */}
              <div className="flex justify-center w-full mt-auto pb-4 sm:pb-2 md:pb-0">
                <div className="w-[90%] sm:w-[80%] md:w-[70%]">
                  <CustomButton
                    text={dict?.common?.learn_more || "Learn More"}
                    as="link"
                    to={`/services#service-${service.slug}`}
                    bgColor={service.mainColor}
                    hoverColor={service.mainColor}
                    ariaLabel={`Learn more about ${service.title}`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
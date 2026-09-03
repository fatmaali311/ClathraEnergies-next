'use client';

import React from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "../../utils/imageUtils";

export default function OurGasSeparation({ page = {}, images = {}, services = [] }) {
  const gasSection = page.gas_separation || {};
  const gases = gasSection.gases || [];

  const solidifiedService = services.find(
    (s) => s.slug === 'solidified-gas-storage' || s.title?.toLowerCase().includes('solidified')
  );

  const bgImage = getImageUrl(images?.gas_bg_image);
  const fireImg = getImageUrl(images?.floating_fire_image);
  const iceImg = getImageUrl(images?.floating_ice_image);
  const leafImg = getImageUrl(images?.floating_leaf_image);

  const overlayDark = gasSection.bg_dark_opacity ?? 0.5;
  const overlayLight = gasSection.bg_light_opacity ?? 0.2;

  return (
    <div className="w-full relative overflow-hidden">

      {/* ================= TITLE ================= */}
      {(gasSection.title || gasSection.sub_title) && (
        <motion.div
          className="text-center mb-10 w-full px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {gasSection.title && (
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-4">
              {gasSection.title}
            </h2>
          )}

          {gasSection.sub_title && (
            <p className="text-gray-600 text-lg sm:text-2xl md:text-3xl font-semibold max-w-4xl mx-auto leading-relaxed">
              {gasSection.sub_title}
            </p>
          )}
        </motion.div>
      )}

      {/* ================= SOLIDIFIED GAS STORAGE CARD ================= */}
      {solidifiedService && (() => {
        const obj = solidifiedService.data?.serviceObj || {};
        const svcImages = solidifiedService.data?.images || {};
        const mainColor = obj.main_color || "var(--primary-green)";

        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-6xl mx-auto mb-14 px-4 relative z-30"
          >
            <div
              className="relative bg-white flex flex-col items-center text-center w-full p-6 sm:p-10 md:p-12 shadow-[8px_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300"
              style={{ border: `3px solid ${mainColor}` }}
            >
              <h3 className="text-xl sm:text-3xl md:text-4xl font-semibold mb-4 text-gray-700">
                {solidifiedService.title}
              </h3>

              {obj.sub_title && (
                <p className="text-gray-600 text-lg sm:text-xl md:text-2xl mb-3 leading-relaxed">
                  {obj.sub_title}
                </p>
              )}

              {obj.paragraph && (
                <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-8 max-w-4xl leading-relaxed">
                  {obj.paragraph}
                </p>
              )}

              {/* Inner Boxes */}
              <div className="grid gap-8 w-full grid-cols-1 sm:grid-cols-2 justify-items-center items-stretch">
                {(obj.details || []).map((box, j) => {
                  const points = box.points ? Object.values(box.points) : [];
                  const iconUrl = getImageUrl(svcImages[box.icon] || "");

                  return (
                    <div
                      key={j}
                      className="flex flex-col items-center text-center w-full p-6 sm:p-8 bg-white shadow-[0_10px_15px_-5px_rgba(0,0,0,0.15)] transition-all duration-300"
                      style={{ border: `2px solid ${mainColor}` }}
                    >
                      {iconUrl && (
                        <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4">
                          <img src={iconUrl} alt={box.title} className="object-contain w-3/4 h-3/4" />
                        </div>
                      )}
                      <h4 className="mb-4 font-semibold text-lg sm:text-xl md:text-2xl text-gray-700">
                        {box.title}
                      </h4>
                      {points.length > 0 && (
                        <ul className="list-disc w-full space-y-2 text-left pl-6 sm:pl-8 text-sm sm:text-base md:text-lg text-gray-600">
                          {points.map((p, k) => (
                            <li key={k} className="leading-relaxed">{p}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      })()}

      {/* ================= BACKGROUND ================= */}
      <div className="relative pt-8 pb-36">

        {/* Background image */}
        {bgImage && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        {/* Overlay (opacities from API) */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
                      to right,
                      rgba(0,0,0,${overlayDark}),
                      rgba(255,255,255,${overlayLight})
                    )`
          }}
        />


        <div className="relative z-20 max-w-6xl mx-auto px-4">

          {/* ================= BIG ARROW ================= */}
          <div className="relative w-full mb-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full aspect-[4/1] md:aspect-[5/1] max-h-56"
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 220"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="arrowGradientAPI" x1="0%" y1="0%" x2="100%" y2="0%">
                    {gases.map((gas, i) => (
                      <stop
                        key={i}
                        offset={`${(i / (gases.length - 1)) * 100}%`}
                        stopColor={gas.color}
                      />
                    ))}
                  </linearGradient>
                </defs>

                <rect
                  x="0"
                  y="65"
                  width="880"
                  height="95"
                  fill="url(#arrowGradientAPI)"
                  rx="12"
                />
                <polygon
                  points="870,35 870,185 990,110"
                  fill={gases[gases.length - 1]?.color}
                />
              </svg>
            </motion.div>

            {/* Floating Icons */}
            <motion.div
              className="absolute inset-0 flex items-center pointer-events-none px-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.5, delayChildren: 1.2 },
                },
              }}
            >
              <div className="w-full flex justify-between items-center">
                {fireImg && <motion.img src={fireImg} className="w-14 md:w-24" />}
                {iceImg && <motion.img src={iceImg} className="w-16 md:w-28" />}
                {leafImg && <motion.img src={leafImg} className="w-14 md:w-24 mr-8" />}
              </div>
            </motion.div>
          </div>

          {/* ================= CYLINDERS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 justify-items-center">
            {gases.map((gas, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center w-3/4 max-w-[200px]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Top Arrow */}
                <svg className="w-14 h-28 md:w-16 md:h-36" viewBox="0 0 50 100">
                  <rect x="13" y="0" width="24" height="75" fill={gas.color} rx="4" />
                  <path d="M5 70 L45 70 L25 95 Z" fill={gas.color} />
                </svg>

                {/* Label */}
                <div className="my-3 bg-white/80 px-4 py-2 rounded-full shadow-sm min-h-[50px] flex items-center justify-center text-center">
                  <span className="text-lg md:text-xl font-bold leading-tight" style={{ color: gas.color }}>
                    {gas.name.split(/(\d+)/).map((part, index) =>
                      /\d/.test(part) ? <sub key={index} className="text-sm border-0">{part}</sub> : part
                    )}
                  </span>
                </div>

                {/* Middle Arrow */}
                <svg className="w-14 h-28 md:w-16 md:h-36" viewBox="0 0 50 100">
                  <rect x="13" y="0" width="24" height="75" fill={gas.color} rx="4" />
                  <path d="M5 70 L45 70 L25 95 Z" fill={gas.color} />
                </svg>

                {/* Cylinder image */}
                {images[`gases[${i}]`] && (
                  <img
                    src={getImageUrl(images[`gases[${i}]`])}
                    className="w-full drop-shadow-xl"
                    alt={gas.name}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* ================= BUTTON ================= */}
          {(() => {
            const btn = gasSection.button || {};
            const btnTitle = btn.title;
            const btnLink = btn.link;
            const isInternal = typeof btnLink === 'string' && btnLink.startsWith('/');
            if (!btnTitle || !btnLink) return null;

            return (
              <motion.div
                className="w-full flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <a href={btnLink} target={isInternal ? '_self' : '_blank'} rel={isInternal ? undefined : 'noopener noreferrer'}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="
                      px-14 py-5
                      rounded-full
                      text-lg md:text-xl
                      font-bold
                      tracking-wide
                      text-white
                      shadow-xl
                      hover:scale-110
                      hover:shadow-2xl
                      transition-all
                      duration-300
                      focus:outline-none
                      focus:ring-4
                      focus:ring-white/40
                    "
                    style={{
                      backgroundImage: `linear-gradient(
                        to right,
                        ${gases[0]?.color},
                        ${gases[1]?.color},
                        ${gases[2]?.color}
                      )`,
                    }}
                  >
                    {btnTitle}
                  </motion.button>
                </a>
              </motion.div>
            );
          })()}

        </div>
      </div>
    </div>
  );
}
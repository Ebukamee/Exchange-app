"use client";
import { motion } from "framer-motion";

/**
 * Wraps children in a scroll-triggered fade+slide-up animation.
 * @param {"up"|"down"|"left"|"right"} direction — slide direction
 * @param {number} delay — seconds to wait before animating
 * @param {number} distance — px to slide from
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  distance = 24,
  duration = 0.5,
  once = true,
  className,
  style,
  ...rest
}) {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "down" || direction === "right" ? -1 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, [axis]: distance * sign }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — wrap multiple ScrollReveal children for cascading delays */
export function staggerDelay(index, base = 0.08) {
  return index * base;
}
